import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Email, Lock, PersonFill } from "../../constants/icons";

function Login() {
  window.localStorage.removeItem("email");

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  async function onSubmit(data) {
    localStorage.setItem("email", data.email);

    history.push("/admin");
  }

  return (
    <Container className="form">
      <Row>
        <Col className="form__col--1 col-sm-12   col-lg-6">
          <PersonFill />
          <p className="form__info">
            If you have an existing admin user, please enter your email and
            password in this form.
          </p>
        </Col>
        <Col className="form__col--2 col-sm-11 col-lg-6">
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h2 className="main__title">Log in</h2>
            <Form.Group>
              <Form.Label className="form__label">
                {" "}
                <Email />
                Email
              </Form.Label>
              <Form.Control
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter an email address"
                ref={register}
                required="true"
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="form__label">
                {" "}
                <Lock />
                Password
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter a password"
                ref={register}
                required="true"
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
