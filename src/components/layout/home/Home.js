import React, { useState, useEffect, useRef } from "react";
import { BASE_URL, FETCH_OPTIONS } from "../../constants/api";
import Heading from "../Heading";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeHeader from "./HomeHeader";
import Search from "./Search";
import HomeCard from "./HomeCard";
import InfoBoxes from "./InfoBoxes";

export function Home() {
  <Heading title="Home" />;
  window.localStorage.removeItem("email");

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = BASE_URL + "establishments";
    fetch(url, FETCH_OPTIONS)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setError("A server error occured.");
        }
      })
      .then((json) => {
        setHotels(json);
        setFilteredHotels(json);
        setError(null);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const node = useRef();
  const [dropdown, setDropdown] = useState(false);

  const toggling = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (node.current && node.current.contains(event.target)) {
        setIsSearched(true);
        return;
      }
      setIsSearched(false);
      setDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node]);

  const filterHotels = function (e) {
    setIsSearched(true);
    const searchValue = e.target.value.toLowerCase();

    const filteredArray = hotels.filter(function (h) {
      const lowerCaseName = h.name.toLowerCase();

      if (searchValue.length === 0) {
        setIsSearched(false);
      }

      if (searchValue === undefined || searchValue === null) {
        console.log("sorry no match");
      }

      if (lowerCaseName.includes(searchValue)) {
        return true;
      }

      return false;
    });

    setFilteredHotels(filteredArray);
  };

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
    <Container>
      <HomeHeader />
      <Row className="home">
        <Col className="home__col">
          <h1>Find your dream hotel in Bergen</h1>

          <div>
            <Search handleSearch={filterHotels} onChange={toggling} />

            <div
              ref={node}
              className={
                dropdown !== true && isSearched === false
                  ? "d-none "
                  : "d-block dropdown "
              }
            >
              {filteredHotels.map((hotel) => {
                const { id, name, image, price } = hotel;
                return (
                  <Col className="col-sm-12 col-md-8 col-lg-6" key={id}>
                    {" "}
                    <HomeCard
                      className="dropdown__card "
                      id={id}
                      image={image}
                      name={name}
                      price={price}
                    />{" "}
                  </Col>
                );
              })}
            </div>
          </div>
        </Col>
        <InfoBoxes />
      </Row>
    </Container>
  );
}

export default Home;
