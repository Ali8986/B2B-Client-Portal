import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom"; // Use react-router-dom Link for in-app navigation

function BasicBreadcrumbs({ items = [] }) {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.navigation} // Use `to` instead of `href`
            className={item.status === "Active" ? "nav_active" : "nav_inactive"}
          >
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BasicBreadcrumbs;
