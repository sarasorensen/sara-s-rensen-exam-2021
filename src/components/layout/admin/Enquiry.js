import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { BASE_URL, headers, FETCH_OPTIONS } from "../../constants/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Person, Email } from "../../constants/icons";

function Enquiry() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Hotel Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  async function onSubmit(data) {
    console.log("enq", data);

    const url = BASE_URL + "enquiries";

    const options = { headers, method: "POST", body: JSON.stringify(data) };

    await fetch(url, options);

    history.push("/admin/hotels");
  }

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

  return (
    <Container className="form">
      <Row>
        <Col className="form__col--1 col-sm-12 col-lg-6">
          <h1 className="enquiry__name">{detail.name}</h1>
          <img
            src={detail.image}
            className="enquiry__hotel"
            alt={detail.name}
          />
          <p className="form__info">
            Thank you for choosing Holidaze to book your hotel with. Don't worry
            about making any mistakes when booking your hotel, as this can be
            changed later via email support.
          </p>
        </Col>
        <Col className="form__col--2 col-sm-11 col-lg-6">
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h2 className="main__title">Enquiry</h2>
            <Form.Group>
              <Form.Label className="form__label">
                {" "}
                <Person />
                Hotel Name
              </Form.Label>
              <Form.Control
                name="name"
                ref={register}
                className={`form__control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter a name for the hotel"
                required={true}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__label">
                {" "}
                <Email />
                Email
              </Form.Label>
              <Form.Control
                name="email"
                className={`form__control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter an email address"
                ref={register}
                required={true}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="checkin" className="form__label">
                Check In
              </Form.Label>
              <input
                name="checkin"
                id="checkin"
                label="Next appointment"
                type="date"
                className={`form__control ${
                  errors.checkin ? "is-invalid" : ""
                }`}
                required={true}
              />
              <div className="invalid-feedback">{errors.checkin?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="checkout" className="form__label">
                Check Out
              </Form.Label>
              <input
                name="checkout"
                id="checkout"
                label="Next appointment"
                type="date"
                className={`form__control ${
                  errors.checkout ? "is-invalid" : ""
                }`}
                required={true}
              />
              <div className="invalid-feedback">{errors.checkout?.message}</div>
            </Form.Group>
            <button className="btn" type="submit">
              Submit
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Enquiry;
