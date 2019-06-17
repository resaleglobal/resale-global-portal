import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export let consignorLinks = [
  {
    name: "dashboard",
    url: "/app/consignor/dashboard",
    show: OVERRIDE_SHOW || true
  },
  {
    name: "requests",
    url: "/app/consignor/requests",
    show: OVERRIDE_SHOW || false
  },
  { name: "items", url: "/app/consignor/items", show: OVERRIDE_SHOW || false },
  {
    name: "revenue",
    url: "/app/consignor/revenue",
    show: OVERRIDE_SHOW || false
  },
  {
    name: "account",
    url: "/app/consignor/account",
    show: OVERRIDE_SHOW || false
  }
];
