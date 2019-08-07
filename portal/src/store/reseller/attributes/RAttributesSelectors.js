export const accountId = state => state.userAccount.selected.id;

export const attributesOptions = state => {
  return state.rAttributes.all.attributes.map(a => ({label: a.name, value: a.name}))
}
