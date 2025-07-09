import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Form.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync } from '../../services/Actions/authAction';
import { ToastContainer, toast } from 'react-toastify';

const Sign_Up = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated, errorMsg } = useSelector(state => state.authReducer);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cpassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isCreated) {
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate('/Sign_In');
      }, 1500);
    }
  }, [isCreated, navigate]);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      setIsSubmitting(false);
    }
  }, [errorMsg]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    await dispatch(signUpAsync({ email: formData.email, password: formData.password }));
    setIsSubmitting(false);
  };

  const isFormValid =
    formData.email.trim() &&
    formData.password.trim() &&
    formData.cpassword.trim() &&
    formData.password === formData.cpassword;

  return (
    <>
      <ToastContainer />
      <div className="product-form-container">
        <div className="form-card" style={{ maxWidth: "700px" }}>
          <div className='d-flex justify-content-between align-items-end'>
            <div className="form-title">
              <div className="title-icon"><FaCircleUser /></div>
              <h2 className="mb-1">Create Account</h2>
            </div>
            <p className="text-muted small">Join us today! Fill in your details</p>
          </div>

          <Form className="product-form mt-3" onSubmit={handleSubmit}>
            <Form.Group className="form-group mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="form-group mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="form-group mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Button
              className="submit-btn w-100 py-2"
              variant="primary"
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account →'}
            </Button>

            <div className="text-center mt-4">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/Sign_In" className="small fw-bold text-decoration-none">
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Sign_Up;
