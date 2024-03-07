import categoryRouter from "./category.router";
import { api as apiSettings } from "../siteSettings/default.setting";

const routes: any = (app: any) => {
  app.use(
    `/${apiSettings.api}/${apiSettings.version}/category`,
    categoryRouter
  );
};

export default routes;
