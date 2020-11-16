import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "register";
const routeMeta: RouteMeta = {
  title: "Register",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
