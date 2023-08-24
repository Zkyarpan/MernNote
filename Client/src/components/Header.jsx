import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div>
      <header>
        <Link
          to={"/"}
          className="logo"
          style={{
            width: "80px",
            height: "100px",
          }}
        >
          <img src={logo} alt="ReactJS" />
          KeepNote
        </Link>

        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
