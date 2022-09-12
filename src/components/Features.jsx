import React from "react";
import { links } from "../data/dummyLinks";
import { NavLink } from "react-router-dom";

const Features = () => {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <p className="text-5xl text-blue-900 font-bold">Features</p>
      <div className="px-20 mt-8">
        <div className="grid grid-cols-2 gap-x-24 gap-y-10">
          {links.map((link, index) => (
            <NavLink
              to={`/page${index + 1}`}
              key={link.name}
              // onClick={handleCloseSideBar}
              // style={({ isActive }) => ({
              //   backgroundColor: isActive ? currentColor : "",
              // })}
              // className={({ isActive }) =>
              //   isActive ? activeLink : normalLink
              // }
            >
              <div key={link.name} className="navigation-icon-container">
                <img
                  src={require(`../images/${link.icon}`)}
                  alt={link.name}
                  width="40px"
                  height="40px"
                  className="mb-2"
                />
                <span className="capitalize font-semibold">{link.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
