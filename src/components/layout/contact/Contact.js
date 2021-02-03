import React from "react";
import Heading from "../Heading";
import ContactForm from "./ContactForm";

export default function Contact() {
  <Heading title="Contact us" />;
  window.localStorage.removeItem("email");
  return (
    <>
      <ContactForm />
    </>
  );
}
