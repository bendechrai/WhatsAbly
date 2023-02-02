import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const {isLoading, user} = useAuth0();
  return (
    <>
      <header>
        <h1>WhatsAbly</h1>
        <nav>
          <ul>
            <li>
              <Link className="menuitem" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="menuitem" to="/channel/two">
                #two
              </Link>
            </li>
            <li>
              <Link className="menuitem" to="/channel/three">
                #three
              </Link>
            </li>
            {!isLoading && user && <li>{user.email}</li>}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;