import React, { useState, useEffect } from "react";
import { BASE_URL, FETCH_OPTIONS } from "../../constants/api";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Heading from "../Heading";
import Spinner from "react-bootstrap/Spinner";
import { Wifi, Cup, Location } from "../../constants/icons";

export function HotelSpecific() {
  <Heading title="Hotel Specific" />;

  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const url = BASE_URL + "establishments/" + id;

  useEffect(() => {
    fetch(url, FETCH_OPTIONS)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setError("A server error occured.");
        }
      })
      .then((json) => {
        setDetail(json);
        setError(null);
      })
      .catch((error) => console.log("error hotel specific" + error))
      .finally(() => setLoading(false));
  });

  if (loading) {
    return (
      <div className="spinner">
        <Spinner role="status" className="spinner__animation" />
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  localStorage.setItem("name", detail.name);
  localStorage.setItem("image", detail.image);

  return (
    <Container className="specific">
      <Row>
        <Col className="specific__col col-sm-12 col-md-6 col-lg-4">
          <img src={detail.image} className="specific__img" alt={detail.name} />
        </Col>
        <Col className="specific__details col-sm-12 col-md-6 col-lg-4">
          <h1 className="specific__title">{detail.name}</h1>

          <p>Max {detail.maxGuests} guests</p>

          <p>
            {" "}
            Price per night is{" "}
            <span className="hotel__price"> {detail.price}$</span>
          </p>

          <p>{detail.description}</p>

          <p>
            {" "}
            If you have any questions, please contact:{" "}
            <a className="specific__link" href={"mailto:" + detail.email}>
              {detail.email}
            </a>
          </p>
          <Row className="d-flex jc-center text-center specific__icons">
            <Col>
              <Wifi />
              <p>Wifi included</p>
            </Col>
            <Col>
              <Cup />
              <p>Breakfast included</p>
            </Col>
            <Col>
              <Location />
              <p>Central Location</p>
            </Col>
          </Row>
          <Link to={"/enquiry/" + id}>
            <button className="btn ">Book Hotel</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default HotelSpecific;
