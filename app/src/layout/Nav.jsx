import { Link } from "react-router-dom";
import logo from "../img/argentBankLogo.png";

const Nav = () => {
  return (
    <nav class="main-nav">
      <a class="main-nav-logo" href="/">
        <img
          class="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </a>
      <div>
        <Link class="main-nav-item" to="/signin">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
