import { OVERRIDE_SHOW } from "./../../components/sidebar/Sidebar";

export let buyerLinks = [
  {
    name: "purchase history",
    url: "/buyer/history",
    show: OVERRIDE_SHOW || true
  },
  {
    name: "sell your items!",
    url: "/buyer/sell",
    show: OVERRIDE_SHOW || false
  }
];
