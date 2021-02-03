import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { SearchIcon } from "../../constants/icons";

export default function Search({ handleSearch }) {
  return (
    <Form className="search">
      <div className="input-group">
        <input
          type="search"
          className="search__input form-control"
          placeholder="Search Hotel By Name"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(event) => handleSearch(event)}
        />{" "}
        <div className="search__box">
          <SearchIcon />
        </div>
      </div>
    </Form>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
