import React, { useState, useEffect, useContext } from "react";
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { Context } from "./HouseContext";
function CountryDropdown() {
  const { country, setcountry, countries } = useContext(Context);
  const [open, setopen] = useState(false);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setopen(!open)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{country}</div>
          <div className="text-[13px]">Select your place</div>
        </div>
        {open ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu">
        {countries.map((count, index) => {
          return (
            <Menu.Item
              onClick={() => setcountry(count)}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={index}
            >
              {count}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}

export default CountryDropdown;
