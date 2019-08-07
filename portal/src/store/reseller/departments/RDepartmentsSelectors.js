export const accountId = state => state.userAccount.selected.id;

export const departmentsDropdownLoading = state => {
  return state.rDepartments.all.loading || state.rDepartments.create.loading
}