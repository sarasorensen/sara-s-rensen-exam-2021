import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function HomeItem({ id, name, image, price, email }) {
  return (
    <CardDeck>
      <Card className="home__card">
        <Card.Body>
          <Card.Img
            variant="top"
            className="home__img"
            src={image}
            alt={name}
          />
          <ul>
            <li>
              <Card.Title className="home__title">{name}</Card.Title>{" "}
            </li>
            <li>
              <p className="home__price">
                Price: <span className="hotel__price">{price}$</span>
              </p>
            </li>
            <li>
              <p>{email}</p>
            </li>

            <Link to={"hotelSpecific/" + id}>
              <button className="btn btn__card">View Hotel</button>
            </Link>
          </ul>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}

HomeItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default HomeItem;
