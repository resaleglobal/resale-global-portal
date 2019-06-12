import {OVERRIDE_SHOW} from './../../components/sidebar/Sidebar'

export let buyerLinks = [
  {name: 'purchase history', url: '/app/buyer/history', show: OVERRIDE_SHOW || true},
  {name: 'sell your items!', url: '/app/buyer/sell',show: OVERRIDE_SHOW || false},
]