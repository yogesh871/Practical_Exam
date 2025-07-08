import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Form.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaArrowRight, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { googleSignInAsync, signINAsync } from '../../services/Actions/authAction';
import { ToastContainer, toast } from 'react-toastify';

const Sign_In = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, errorMSG } = useSelector(state => state.authReducer);

  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const prevUser = useRef(null);

  useEffect(() => {
    if (user && !prevUser.current) {
      toast.success("User logged in successfully!");
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
    prevUser.current = user;
  }, [user, navigate]);

  useEffect(() => {
    if (errorMSG) {
      toast.error(errorMSG);
    }
  }, [errorMSG]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(signINAsync(formData))
      .finally(() => setIsSubmitting(false));
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    dispatch(googleSignInAsync())
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <ToastContainer />
      <div className="product-form-container">
        <div className="form-card" style={{ maxWidth: "700px" }}>
          <div className='d-flex justify-content-between align-items-end'>
            <div className="form-title">
              <div className="title-icon">
                <FaUser size={16} />
              </div>
              <h2 className="mb-1">Welcome Back</h2> 
            </div>
            <p className="text-muted small">Sign in to continue to your account</p>
          </div>

          <Form className="product-form mt-3" onSubmit={handleSubmit}>
            <Form.Group className="form-group mb-3" controlId="formEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                className="form-input"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="formPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-input"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              <div className="d-flex justify-content-end mt-2">
                <Link 
                  to="/forgot-password" 
                  className="small text-decoration-none" 
                  style={{ color: 'var(--primary)' }}
                >
                  Forgot password?
                </Link>
              </div>
            </Form.Group>

            <Button 
              className="submit-btn w-100 py-2 mb-3" 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
              <span className="btn-icon ms-2"><FaArrowRight /></span>
            </Button>

            <div className="divider mb-3">
              <span className="text-muted small">OR</span>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              className="google-btn w-100 py-2"
              variant="outline-danger"
              type="button"
              disabled={isSubmitting}
            >
              <FaGoogle className="me-2" />
              Sign in with Google
            </Button>

            <div className="text-center mt-4">
              <span className="text-muted small">Don't have an account? </span>
              <Link 
                to="/Sign_Up" 
                className="small fw-bold text-decoration-none" 
                style={{ color: 'var(--primary)' }}
              >
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
