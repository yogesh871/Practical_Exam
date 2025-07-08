
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

import './BlogDetails.css';
import { deleteBlogAsync } from '../../services/Actions/blogAction';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const relatedBlogs = [
    {
      id: 'rel1',
      title: 'Mastering Tailwind CSS',
      category: 'CSS',
      image: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/v1737413490/penguinui/blog/tailwind_css_v4_released.png',
      excerpt: 'Design beautiful interfaces faster with utility-first Tailwind CSS',
    },
    {
      id: 'rel2',
      title: 'React Redux Patterns',
      category: 'React',
      image: 'https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fd7jiugsmvb0felvsxibb.png',
      excerpt: 'Optimize your state management with best practices in Redux',
    },
    {
      id: 'rel3',
      title: 'Firebase Firestore Tips',
      category: 'Firebase',
      image: 'https://bluewhaleapps.com/wp-content/uploads/2019/12/7-Reasons-to-Choose-Google-Cloud-Firestore-as-Your-Database-Solution-1.jpg',
      excerpt: 'Boost your Firestore queries with these performance hacks',
    }
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error('Error fetching blog:', err.message);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    const saved = JSON.parse(localStorage.getItem('savedBlogs')) || [];
    const liked = JSON.parse(localStorage.getItem('likedBlogs')) || [];
    setIsSaved(saved.includes(id));
    setIsLiked(liked.includes(id));
  }, [id]);

  const toggleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedBlogs')) || [];
    const updated = isSaved ? saved.filter((b) => b !== id) : [...saved, id];
    localStorage.setItem('savedBlogs', JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  const toggleLike = () => {
    const liked = JSON.parse(localStorage.getItem('likedBlogs')) || [];
    const updated = isLiked ? liked.filter((b) => b !== id) : [...liked, id];
    localStorage.setItem('likedBlogs', JSON.stringify(updated));
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    if (!user || user.uid !== blog.userId) {
      alert("Unauthorized");
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlogAsync(blog.id));
      navigate("/");
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!blog) return <div className="not-found-container"><h3>Blog not found!</h3></div>;

  return (
    <div className="blog-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <div className="blog-detail-card">
  <div className="blog-image-container">
    <img
      src={blog.image}
      alt={blog.title}
      className="blog-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
      }}
    />

    <div className="blog-actions">
      <button
        className={`action-btn ${isSaved ? 'saved' : ''}`}
        onClick={toggleSave}
        data-tooltip={isSaved ? "Unsave" : "Save"}
      >
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      <button
        className={`action-btn ${isLiked ? 'liked' : ''}`}
        onClick={toggleLike}
        data-tooltip={isLiked ? "Unlike" : "Like"}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {user?.uid === blog.userId && (
        <>
          <button
            className="action-btn edit-btn"
            onClick={() => navigate(`/editBlog/${blog.id}`)}
            data-tooltip="Edit"
          >
            <FaEdit />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            data-tooltip="Delete"
          >
            <FaTrash />
          </button>
        </>
      )}
    </div>
  </div>

  <div className="blog-content">
    <div className="blog-meta">
      <span className="category-badge">{blog.category}</span>
      <span className="date">📅 {new Date(blog.date).toLocaleDateString('en-US')}</span>
      {blog.author && <span className="author">✍️ {blog.author}</span>}
    </div>

    <h1 className="blog-title">{blog.title}</h1>

    <div className="blog-description">
      {blog.description.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
</div>


      <div className="related-blogs-section">
        <h3 className="section-title">You might also like</h3>
        <div className="related-blogs-grid">
          {relatedBlogs.map((item) => (
            <div key={item.id} className="related-blog-card" onClick={() => navigate(`/blog/${item.id}`)}>
              <div className="related-blog-image-container">
                <img src={item.image} alt={item.title} className="related-blog-image" />
              </div>
              <div className="related-blog-content">
                <span className="related-blog-category">{item.category}</span>
                <h4 className="related-blog-title">{item.title}</h4>
                <p className="related-blog-excerpt">{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
