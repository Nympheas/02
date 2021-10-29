/**
 * NavLink component.
 *
 * General component to show a link with ability to define active className.
 */
import React from "react";
import { Link } from "@reach/router";
import cn from "classnames";

const NavLink = ({ to, className, activeClassName, children, exact }) => (
  <Link
    to={to}
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: cn(className, {
          [activeClassName]: exact ? isCurrent : isPartiallyCurrent,
        }),
      };
    }}
  >
    {children}
  </Link>
);

export default NavLink;
