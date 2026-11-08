/**
 * Serialises structured data for a `<script type="application/ld+json">` block.
 *
 * `JSON.stringify` alone is not safe in an HTML context: a value containing
 * `</script>` would close the element and turn the remainder into live markup.
 * Escaping the HTML-significant characters (and the JavaScript line/paragraph
 * separators) keeps the payload inert while remaining valid JSON.
 */
export function serializeJsonLd(schema: unknown): string {
  return (JSON.stringify(schema) ?? "{}")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
