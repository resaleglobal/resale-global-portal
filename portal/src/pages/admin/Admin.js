import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export const adminLinks = [
  {
    name: "dashboard",
    url: "/admin/dashboard",
    show: OVERRIDE_SHOW || true
  },
  { name: "users", url: "/admin/users", show: OVERRIDE_SHOW || false },
  {
    name: "consignors",
    url: "/admin/consignors",
    show: OVERRIDE_SHOW || false
  },
  { name: "account", url: "/admin/account", show: OVERRIDE_SHOW || false },
  { name: "revenue", url: "/admin/revenue", show: OVERRIDE_SHOW || false }
];
