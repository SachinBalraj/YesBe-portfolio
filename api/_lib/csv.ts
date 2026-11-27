import type { VercelResponse } from "@vercel/node";

export type CsvValue = string | number | boolean | Date | null | undefined;

export interface CsvOptions {
  bom?: boolean;
}

export function csvCell(value: CsvValue): string {
  let text: string;
  if (value === null || value === undefined) {
    text = "";
  } else if (value instanceof Date) {
    text = Number.isNaN(value.getTime()) ? "" : value.toISOString();
  } else {
    text = String(value);
  }

  if (/^[=+\-@\t\r]/.test(text) || /^\s*[=+\-@]/.test(text)) text = `'${text}`;
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function csvString(
  headers: readonly string[],
  rows: readonly (readonly CsvValue[])[],
  options: CsvOptions = {},
): string {
  const lines = [
    headers.map((header) => csvCell(header)).join(","),
    ...rows.map((row) => row.map((cell) => csvCell(cell)).join(",")),
  ];
  return `${options.bom ? "\uFEFF" : ""}${lines.join("\r\n")}\r\n`;
}

export function safeFilename(name: string): string {
  const base = name
    .replace(/\.csv$/i, "")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 120);
  return `${base || "export"}.csv`;
}

export function sendCsv(
  res: VercelResponse,
  filename: string,
  headers: readonly string[],
  rows: readonly (readonly CsvValue[])[],
  options: CsvOptions = {},
): void {
  const body = csvString(headers, rows, { bom: options.bom ?? true });
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${safeFilename(filename)}"`);
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const response = res.status(200) as VercelResponse & { send?: (body: string) => unknown };
  if (typeof response.send === "function") response.send(body);
  else response.end(body);
}
