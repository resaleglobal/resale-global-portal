import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export let resellerLinks = [
  {
    name: "dashboard",
    url: "/reseller/dashboard",
    show: OVERRIDE_SHOW || true
  },
  {
    name: "consignors",
    url: "/reseller/consignors",
    show: OVERRIDE_SHOW || false
  },
  {
    name: "categories",
    url: "/reseller/categories",
    show: OVERRIDE_SHOW || false
  },
  { name: "items", url: "/reseller/items", show: OVERRIDE_SHOW || false },
  {
    name: "sold items",
    url: "/reseller/sold-items",
    show: OVERRIDE_SHOW || false
  }
];
