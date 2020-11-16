import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "forgot-password";
const routeMeta: RouteMeta = {
  title: "Forgot Password",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
