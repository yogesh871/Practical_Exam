import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { IoSearchOutline } from 'react-icons/io5';
import { FaPen } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { logoutUser } from '../../services/Actions/authAction';
import 'react-toastify/dist/ReactToastify.css';

import './Header.css';

const Header = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearch = params.get('search') || '';
    setSearchQuery(initialSearch);
  }, [location.search]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate('/Sign_In');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const params = new URLSearchParams(location.search);
    params.set('search', value);
    params.set('page', 1);
    navigate({ pathname: '/', search: params.toString() });
  };

  const handleWriteClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/Sign_In');
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="blog-header shadow-sm">
        <Container>
          <div className="header-wrapper d-flex justify-content-between align-items-center py-3">
            <div className="brand-section d-flex align-items-center">
              <Link to="/" className="logo-link">
                <span className="logo-text">BlogSphere</span>
              </Link>
            </div>

            <div className="search-section d-none d-md-flex">
              <div className="search-bar">
                <IoSearchOutline className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search articles, topics, and authors..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className="nav-actions">
              <Navbar expand="md" variant="light">
                <Nav className="d-flex flex-row align-items-center">
                  <Link
                    to="/Add_Blog"
                    className="nav-link create-post"
                    onClick={handleWriteClick}
                  >
                    <FaPen className="icon text-white" />
                    <span className="link-text text-white">Write</span>
                  </Link>

                  {user && (
                    <Link to="/dashboard" className="nav-link dashboard">
                      <MdOutlineDashboard className="icon text-white" />
                      <span className="link-text text-white">Dashboard</span>
                    </Link>
                  )}

                  <NavDropdown
                    title={
                      <div className="profile-dropdown-trigger">
                        <CgProfile className="profile-icon" />
                        <span className="ms-2 text-white">
                          {user ? user.email || user.uid : "Account"}
                        </span>
                      </div>
                    }
                    align="end"
                    menuVariant="dark"
                    className="profile-dropdown"
                  >
                    {user ? (
                      <>
                        <NavDropdown.Item as={Link} to="/MyBlogs" className="dropdown-item">
                          <CgProfile className="me-2" />
                          My Blogs
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/settings" className="dropdown-item">
                          <MdOutlineDashboard className="me-2" />
                          Account Settings
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/saved" className="dropdown-item">
                          <FaPen className="me-2" />
                          Saved Articles
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          className="dropdown-item logout text-danger"
                          onClick={handleLogout}
                          style={{ cursor: 'pointer' }}
                        >
                          Log Out
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <>
                        <NavDropdown.Item as={Link} to="/Sign_In" className="dropdown-item">
                          Sign In
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Sign_Up" className="dropdown-item">
                          Sign Up
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </Nav>
              </Navbar>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
