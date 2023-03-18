import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";
export const Context = createContext();
function HouseContext({ children }) {
  const [houses, sethouses] = useState(housesData);
  const [country, setcountry] = useState("Location (any)");
  const [countries, setcountries] = useState([]);
  const [property, setproperty] = useState("Property type (any)");
  const [properties, setproperties] = useState([]);
  const [price, setprice] = useState("Price range (any)");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    const uniquecountries = ["Location (any)", ...new Set(allCountries)];
    setcountries(uniquecountries);
  }, []);
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];
    setproperties(uniqueProperties);
  }, []);
  const handleclick = () => {
    setloading(true);
    const isdefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    const minprice = parseInt(price.split(" ")[0]);
    const maxprice = parseInt(price.split(" ")[2]);
    const newhouses = housesData.filter((house) => {
      const houseprice = parseInt(house.price);
      if (
        house.country === country &&
        house.type === property &&
        houseprice >= minprice &&
        houseprice <= maxprice
      ) {
        return house;
      }
      if (isdefault(country) && isdefault(property) && isdefault(price)) {
        return house;
      }
      if (!isdefault(country) && isdefault(property) && isdefault(price)) {
        return house.country === country;
      }
      if (isdefault(country) && !isdefault(property) && isdefault(price)) {
        return house.type === property;
      }
      if (isdefault(country) && isdefault(property) && !isdefault(price)) {
        if (houseprice >= minprice && houseprice <= maxprice) {
          return house;
        }
      }
      if (!isdefault(country) && !isdefault(property) && isdefault(price)) {
        return house.country === country && house.type === property;
      }
      if (!isdefault(country) && isdefault(property) && !isdefault(price)) {
        if (houseprice >= minprice && houseprice <= maxprice) {
          return house.country === country;
        }
      }
      if (isdefault(country) && !isdefault(property) && !isdefault(price)) {
        if (houseprice >= minprice && houseprice <= maxprice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newhouses.length < 1 ? sethouses([]) : sethouses(newhouses),
        setloading(false)
      );
    }, 1000);
  };

  return (
    <Context.Provider
      value={{
        country,
        setcountry,
        countries,
        property,
        setproperty,
        properties,
        price,
        setprice,
        houses,
        loading,
        handleclick,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default HouseContext;
