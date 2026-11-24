import { serveListYourProperty } from "../../_list-your-property/serve";

// fanoproperties.com/lp/ar/list-your-property: the Arabic version of the "List your property" page.
// More specific than /lp/[[...slug]], so it is served here rather than from the team app.
export function GET() {
  return serveListYourProperty("ar");
}
