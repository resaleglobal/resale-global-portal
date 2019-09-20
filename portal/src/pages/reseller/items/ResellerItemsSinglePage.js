import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import Section from "../../../components/section/Section";
import { fetchResellerSingleItem } from "../../../store/reseller/single-item/RSingleItemActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import renderHTML from "react-render-html";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class ResellerItemsSinglePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: ""
    };
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;
    this.setState(
      {
        itemId: itemId
      },
      () => this.fetch(this.state)
    );
  }

  fetch = params => {
    this.props.fetchResellerSingleItem(params);
  };

  render() {
    const { item } = this.props;
    return (
      <>
        <Section title="Info">
          {item ? (
            <div className="info-section">
              <div className="single-item-carousel">
                <Carousel>
                  {item.images.map(i => (
                    <div>
                      <img
                        src={`https://resale-global.sfo2.cdn.digitaloceanspaces.com/${i.bucket}/${i.url}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="single-item-table">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Title:</TableCell>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Consignor:</TableCell>
                      <TableCell>{item.consignor.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Category:</TableCell>
                      <TableCell>{item.category.displayName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description:</TableCell>
                      <TableCell>{renderHTML(item.description)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status:</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price:</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weight:</TableCell>
                      <TableCell>{item.weight}</TableCell>
                    </TableRow>
                    {item.attributes.map(a => (
                      <TableRow>
                        <TableCell>{a.attribute.name}:</TableCell>
                        <TableCell>{a.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Section>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResellerSingleItem: params => dispatch(fetchResellerSingleItem(params))
  };
};

const mapStateToProps = state => ({
  item: state.rSingleItem.item,
  loading: state.rSingleItem.loading,
  hasError: state.rSingleItem.hasError,
  error: state.rSingleItem.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResellerItemsSinglePage);
