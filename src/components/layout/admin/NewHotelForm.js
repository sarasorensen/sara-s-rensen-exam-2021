import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { BASE_URL, headers } from "../../constants/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddHotel() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Hotel Name is required"),
    imageurl: Yup.string().required("Image Url is required"),
    address: Yup.string().required("address is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    maxGuests: Yup.string().required("Max Guests is required"),
    price: Yup.string().required("Price is required"),
  });

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  async function onSubmit(data) {
    console.log("data", data);

    const url = BASE_URL + "establishments";

    const options = { headers, method: "POST", body: JSON.stringify(data) };

    await fetch(url, options);

    history.push("/admin/hotels");
  }

  return (
    <Container className="form">
      <Row>
        <Col className="form__col--2 col-sm-11 col-lg-6">
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h2>Add Hotel</h2>
            <Form.Group>
              <Form.Label className="form__label">Hotel Name</Form.Label>
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
              <Form.Label className="form__label">Image Url</Form.Label>
              <Form.Control
                name="imageurl"
                ref={register}
                className={`form__control ${
                  errors.imageurl ? "is-invalid" : ""
                }`}
                placeholder="http://example.com"
                required={true}
              />
              <div className="invalid-feedback">{errors.imageurl?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__label">Email</Form.Label>
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
              <Form.Label className="form__label">Adress</Form.Label>
              <Form.Control
                name="address"
                className={`form__control ${
                  errors.address ? "is-invalid" : ""
                }`}
                placeholder="Enter an address"
                ref={register}
                required={true}
              />
              <div className="invalid-feedback">{errors.address?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__label">Price per night</Form.Label>
              <Form.Control
                name="price"
                className={`form__control ${errors.price ? "is-invalid" : ""}`}
                placeholder="Enter an number"
                ref={register}
                required={true}
              />
              <div className="invalid-feedback">{errors.price?.message}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__label">Max Guests</Form.Label>
              <Form.Control
                name="maxGuests"
                className={`form__control ${
                  errors.maxGuests ? "is-invalid" : ""
                }`}
                placeholder="Enter an number"
                ref={register}
                required={true}
              />
              <div className="invalid-feedback">
                {errors.maxGuests?.message}
              </div>
            </Form.Group>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn" type="reset">
              Reset
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddHotel;
