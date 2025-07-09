import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-logo">
          <h2>Blog<span>Sphere</span></h2>
          <p>Explore, create, and share your thoughts with the world.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/create">Write</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div className="footer-more">
          <h4>More</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-subscribe">
          <h4>Subscribe to Our Newsletter</h4>
          <p>Get the latest blog updates and stories delivered to your inbox.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
