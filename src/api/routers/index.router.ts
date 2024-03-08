import categoryRouter from "./category.router";
import { api as apiSettings } from "../siteSettings/default.setting";
import adminRouter from "./admin.router";

const routes: any = (app: any) => {
  app.use(
    `/${apiSettings.api}/${apiSettings.version}/category`,
    categoryRouter
  );
  app.use(`/${apiSettings.api}/${apiSettings.version}/admin`, adminRouter);
};

export default routes;
