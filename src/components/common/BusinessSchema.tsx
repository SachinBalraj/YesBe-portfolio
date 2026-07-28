import { JsonLd } from "./JsonLd";
import { BUSINESS_INFO } from "@/constants";

export function BusinessSchema() {
  return (
    <>
      <JsonLd schema={BUSINESS_INFO.organization} />
      <JsonLd schema={BUSINESS_INFO.website} />
    </>
  );
}
