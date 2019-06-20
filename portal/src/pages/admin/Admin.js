import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export const adminLinks = [
  {
    name: "dashboard",
    url: "/app/admin/dashboard",
    show: OVERRIDE_SHOW || true
  },
  { name: "users", url: "/app/admin/users", show: OVERRIDE_SHOW || false },
  {
    name: "consignors",
    url: "/app/admin/consignors",
    show: OVERRIDE_SHOW || false
  },
  { name: "account", url: "/app/admin/account", show: OVERRIDE_SHOW || false },
  { name: "revenue", url: "/app/admin/revenue", show: OVERRIDE_SHOW || false }
];
