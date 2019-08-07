export const accountId = state => state.userAccount.selected.id;

export const sectionsDropdownLoading = state => {
  return state.rSections.dropdown.loading || state.rSections.create.loading
}