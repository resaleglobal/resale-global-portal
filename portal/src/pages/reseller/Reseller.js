import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export let resellerLinks = [
  {
    name: "dashboard",
    url: "/app/reseller/dashboard",
    show: OVERRIDE_SHOW || true
  },
  {
    name: "consignors",
    url: "/app/reseller/consignors",
    show: OVERRIDE_SHOW || false
  },
  {
    name: "categories",
    url: "/app/reseller/categories",
    show: OVERRIDE_SHOW || false
  },
  { name: "items", url: "/app/reseller/items", show: OVERRIDE_SHOW || false },
  {
    name: "sold items",
    url: "/app/reseller/sold-items",
    show: OVERRIDE_SHOW || false
  }
];
