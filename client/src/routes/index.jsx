
import Page from "../page";
import Page2 from "../page/page2";
const Router = [
  {
    path: "/",
    component: Page,
    Layout: null,
  },
  {
    path: "/page2",
    component: Page2,
    Layout: null,
  }
];

export default Router;
