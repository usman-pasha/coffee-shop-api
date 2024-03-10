import { api as apiSettings } from "../siteSettings/default.setting";
import categoryRouter from "./category.router";
import adminRouter from "./admin.router";
import productRouter from "./product.router";

const routes: any = (app: any) => {
  app.use(
    `/${apiSettings.api}/${apiSettings.version}/category`,
    categoryRouter
  );
  app.use(`/${apiSettings.api}/${apiSettings.version}/admin`, adminRouter);
  app.use(`/${apiSettings.api}/${apiSettings.version}/product`, productRouter);
};

export default routes;
