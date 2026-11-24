import { serveListYourProperty } from "../../_list-your-property/serve";

// fanoproperties.com/lp/en/list-your-property: owners selling or leasing in Dubai send their property's details.
// More specific than /lp/[[...slug]], so it is served here rather than from the team app.
export function GET() {
  return serveListYourProperty("en");
}
