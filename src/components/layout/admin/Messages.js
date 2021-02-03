import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL, FETCH_OPTIONS } from "../../constants/api";
import { Message } from "../../constants/icons";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = BASE_URL + "contacts";
    fetch(url, FETCH_OPTIONS)
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          setError("A server error occured.");
        }
      })
      .then(function (data) {
        setMessages(data);
        setError(null);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

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

  function List({ messages, fallback, id }) {
    if (!messages || messages.length === 0) {
      return fallback;
    } else {
      return (
        <div id="messages" className="admin__col">
          <h2 className="admin__h2">Messages from Clients</h2>

          {messages.map((item) => (
            <div key={item.id} className="admin__box">
              <ul>
                <li>
                  {" "}
                  <h3>{item.name}</h3>
                </li>
                <li>
                  {" "}
                  <a href={"mailto:" + item.email}>{item.email}</a>
                </li>
                <li>
                  {" "}
                  <p>
                    <Message /> {item.message}
                  </p>
                </li>
              </ul>

              <a className="btn" href={"mailto:" + item.email}>
                Reply
              </a>
            </div>
          ))}
        </div>
      );
    }
  }

  return <List messages={messages} fallback={"Can't fetch Messages..."} />;
}
