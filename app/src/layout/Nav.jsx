import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';
import logo from "../img/argentBankLogo.png";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profile.profileData);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleSignout = () => {
    localStorage.removeItem('token');
    
    dispatch(logout());
    navigate('/signin');
  }

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

          <a className="main-nav-item" onClick={handleSignout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
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
