import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaRegBookmark, FaBookmark,
  FaRegHeart, FaHeart,
  FaRegComment, FaEye, FaEdit, FaTrash
} from 'react-icons/fa';
import { getBlogsAsync, deleteBlogAsync } from '../services/Actions/blogAction';
import './Home.css';
import Showcase from './ShowCase/ShowCase';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { blogs, isLoading } = useSelector(state => state.blogReducer);
  const { user } = useSelector(state => state.authReducer);

  const [savedBlogs, setSavedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const blogsPerPage = 12;

  useEffect(() => {
    dispatch(getBlogsAsync());
    setSavedBlogs(JSON.parse(localStorage.getItem('savedBlogs')) || []);
    setLikedBlogs(JSON.parse(localStorage.getItem('likedBlogs')) || []);
  }, [dispatch]);

  const toggleSaveBlog = (blogId) => {
    const updated = savedBlogs.includes(blogId)
      ? savedBlogs.filter(id => id !== blogId)
      : [...savedBlogs, blogId];
    setSavedBlogs(updated);
    localStorage.setItem('savedBlogs', JSON.stringify(updated));
  };

  const toggleLikeBlog = (blogId) => {
    const updated = likedBlogs.includes(blogId)
      ? likedBlogs.filter(id => id !== blogId)
      : [...likedBlogs, blogId];
    setLikedBlogs(updated);
    localStorage.setItem('likedBlogs', JSON.stringify(updated));
  };

  const handleDelete = (blogId, userId) => {
    if (!user) return alert('Unauthorized action.');
    if (user.uid !== userId) return alert('You are not the owner of this blog.');
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlogAsync(blogId, userId));
    }
  };

  let filteredBlogs = blogs;
  if (selectedCategory) {
    filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory);
  }

  if (searchTerm) {
    filteredBlogs = filteredBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm)
    );
  }

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const categoryOptions = [
    { value: 'Technology', color: '#3b82f6' },
    { value: 'Education', color: '#10b981' },
    { value: 'Lifestyle', color: '#f59e0b' },
    { value: 'Health', color: '#ef4444' },
    { value: 'Travel', color: '#8b5cf6' },
    { value: 'Business', color: '#6366f1' }
  ];

  return (
    <>
    <div className="blog-explorer">
      <header className="explorer-header">
        <h1>Discover Stories</h1>
        <p className="subtitle">Thoughts, ideas, and perspectives from our community</p>

        <div className="filter-section">
          <div className="category-filter">
            <button
              className={`filter-option ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
              >
              All
            </button>
            {categoryOptions.map((cat) => (
              <button
              key={cat.value}
              className={`filter-option ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => {
                  setSelectedCategory(cat.value);
                  navigate(`/?page=1&search=${searchTerm}`);
                }}
                style={{
                  '--category-color': cat.color,
                  '--category-bg': `${cat.color}20`
                }}
              >
                {cat.value}
              </button>
            ))}
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading stories...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="empty-state">
          <h3>No stories found</h3>
          <p>{selectedCategory ? `No ${selectedCategory} stories yet` : 'Be the first to share your story'}</p>
          <button className="create-btn" onClick={() => navigate('/Add_Blog')}>
            Create Your First Post
          </button>
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {currentBlogs.map((blog) => {
              const color = categoryOptions.find(cat => cat.value === blog.category)?.color || '#64748b';
              
              return (
                <article key={blog.id} className="blog-card">
                  <div className="card-image-container">
                    <img
                      src={blog.image || 'https://source.unsplash.com/random/600x400?writing'}
                      alt={blog.title}
                      className="blog-image"
                      onClick={() => navigate(`/Blog/${blog.id}`)}
                      />
                    <button
                      className={`action-btn save-btn ${savedBlogs.includes(blog.id) ? 'saved' : ''}`}
                      onClick={() => toggleSaveBlog(blog.id)}
                      aria-label={savedBlogs.includes(blog.id) ? "Unsave blog" : "Save blog"}
                    >
                      {savedBlogs.includes(blog.id) ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>

                  <div className="blog-body">
                    <span className="category-tag" style={{ backgroundColor: `${color}20`, color }}>
                      {blog.category || 'Uncategorized'}
                    </span>
                    <h3 onClick={() => navigate(`/Blog/${blog.id}`)}>{blog.title}</h3>
                    <p className="excerpt">
                      {blog.description.length > 100
                        ? `${blog.description.slice(0, 100)}...`
                        : blog.description}
                    </p>

                    <div className="blog-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => navigate(`/Blog/${blog.id}`)}
                        title="View Blog"
                      >
                        <FaEye />
                      </button>

                      {user?.uid === blog.userId && (
                        <>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => navigate(`/editBlog/${blog.id}`)}
                            title="Edit Blog"
                            >
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(blog.id, blog.userId)}
                            title="Delete Blog"
                            >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>

                    <footer className="blog-footer">
                      <div className="meta-data">
                        <time className="date">
                          {new Date(blog.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        <span className="author">by {blog.author || 'Anonymous'}</span>
                      </div>

                      <div className="interaction-buttons">
                        <button
                          className={`interaction-btn like-btn ${likedBlogs.includes(blog.id) ? 'liked' : ''}`}
                          onClick={() => toggleLikeBlog(blog.id)}
                          title="Like Blog"
                        >
                          {likedBlogs.includes(blog.id) ? <FaHeart /> : <FaRegHeart />}
                          <span>{likedBlogs.includes(blog.id) ? 'Liked' : 'Like'}</span>
                        </button>
                        <button
                          className="interaction-btn comment-btn"
                          onClick={() => navigate(`/Blog/${blog.id}#comments`)}
                          title="View Comments"
                        >
                          <FaRegComment />
                          <span>Comment</span>
                        </button>
                      </div>
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    searchParams.set('page', index + 1);
                    navigate({ search: searchParams.toString() });
                  }}
                  className={currentPage === index + 1 ? 'active-page' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>

    <Showcase/>
      </>
  );
};

export default Home;
