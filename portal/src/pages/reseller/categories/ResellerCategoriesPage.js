import { Component } from "react";
import React from "react";
import CategoriesList from "./CategoriesList";
import DepartmentsList from "./DepartmentsList";
import SectionsList from "./SectionsList";

class ResellerCategoriesPage extends Component {
  render() {
    return (
      <>
        <CategoriesList></CategoriesList>
        <SectionsList></SectionsList>
        <DepartmentsList></DepartmentsList>
      </>
    );
  }
}

export default ResellerCategoriesPage;
