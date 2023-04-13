import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ separator = " ", crumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div
      aria-label="breadcrumb"
      className="ps-4 pt-4"
      data-aos="fade-down"
    >
      <ol className="breadcrumb container">
        <li className="breadcrumb-item">
          <Link className="text-decoration-none text-danger" to="/">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li
              className="breadcrumb-item active text-capitalize"
              aria-current="page"
              key={name}
            >
              {name}
            </li>
          ) : (
            <li className="breadcrumb-item text-capitalize" key={name}>
              <Link className="text-danger text-decoration-none" to={routeTo}>
                {name}
              </Link>
              {separator}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
