import React from "react";
import "./Showcase.css";

const stories = [
  {
    title: "The Future of AI",
    img: "https://thefusioneer.com/wp-content/uploads/2023/11/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg",
    link: "/blogs/ai-future"
  },
  {
    title: "Design That Speaks",
    img: "https://assets.architecturaldigest.in/photos/6768fa53157304e74469a0b0/16:9/w_2560%2Cc_limit/AD-06-2%2520-%2520Marketing%2520DtaleModern.jpg",
    link: "/blogs/design-inspiration"
  },
  {
    title: "Explore The Mountains",
    img: "https://static1.squarespace.com/static/60f12dab90c6c77e8cc7fb2c/60f130a593f2b300380e8a14/60f130a693f2b300380e8a9e/1626670763914/view+of+Everest+from+Gokyo+with+tourist+on+the+way+to+Everest+-+Nepal.jpg?format=1500w",
    link: "/blogs/mountain-escape"
  },
  {
    title: "Startup Growth Hacks",
    img: "https://observenow.com/wp-content/uploads/2025/01/Indian-Startup-Ecosystem.png",
    link: "/blogs/startup-growth"
  },
];

const Showcase = () => {
  return (
    <section className="image-showcase">
      <h2>Discover Stories</h2>
      <div className="showcase-grid">
        {stories.map((story, index) => (
          <a href={story.link} className="showcase-card" key={index}>
            <img src={story.img} alt={story.title} />
            <div className="overlay">
              <h3>{story.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
