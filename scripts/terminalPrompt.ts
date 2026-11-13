import { stdin, stderr } from "node:process";

export function readHidden(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const wasRaw = stdin.isRaw;
    let value = "";

    const cleanup = (): void => {
      stdin.off("data", onData);
      stdin.setRawMode(wasRaw);
      stdin.pause();
    };

    const onData = (chunk: string): void => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          cleanup();
          stderr.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u0003") {
          cleanup();
          stderr.write("\n");
          reject(new Error("Cancelled."));
          return;
        }
        if (char === "\u007f" || char === "\b") {
          value = value.slice(0, -1);
        } else if (char >= " ") {
          value += char;
        }
      }
    };

    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    stdin.on("data", onData);
    stderr.write(prompt);
  });
}
