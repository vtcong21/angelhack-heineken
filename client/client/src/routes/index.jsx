
import Page from "../page";
import Page2 from "../page/page2";
import Page3 from "../page/page3";

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
  },
  {
    path: "/page3",
    component: Page3,
    Layout: null,
  }
];

export default Router;
