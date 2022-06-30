import React, { useState, useEffect } from "react";

const Zillow = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
    },
  };

  const [data, setData] = useState(null);
  let city = "buffalo";
  let state = "ny";
  useEffect(() => {
    fetch(
      `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=` +
        +city +
        "%2C%20" +
        state,
      options
    )
      .then((response) => response.json())
      .then(setData);
  }, []);
  if (data) {
    return data.imgSrc;
  }
};

export default Zillow;
