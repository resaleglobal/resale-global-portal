import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export let consignorLinks = [
  {
    name: "dashboard",
    url: "/consignor/dashboard",
    show: OVERRIDE_SHOW || true
  },
  {
    name: "requests",
    url: "/consignor/requests",
    show: OVERRIDE_SHOW || false
  },
  { name: "items", url: "/consignor/items", show: OVERRIDE_SHOW || false },
  {
    name: "revenue",
    url: "/consignor/revenue",
    show: OVERRIDE_SHOW || false
  },
  {
    name: "account",
    url: "/consignor/account",
    show: OVERRIDE_SHOW || false
  }
];
