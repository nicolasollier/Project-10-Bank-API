import { Link } from "react-router-dom";
import logo from "../img/argentBankLogo.png";
import { useSelector } from 'react-redux';

const Nav = () => {
  const profileData = useSelector(state => state.profile.profileData);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      {isAuthenticated ? (
        <div id="main-nav-item-wrapper">
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user"></i>
            {profileData ? profileData.firstName : 'Profile'}
          </Link>

          <Link className="main-nav-item" to="/signout">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
