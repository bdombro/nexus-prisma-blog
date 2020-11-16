import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "login";
const routeMeta: RouteMeta = {
  title: "Login",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
