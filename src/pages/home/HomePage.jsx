import NewPost from "./components/NewPost.jsx";
import {useContext} from "react";
import {PostContext} from "../../App.jsx";
import PostItem from "./components/PostItem.jsx";
import "./HomePage.css"

function HomePage() {
  const { posts } = useContext(PostContext)
  return (
    <div className="homepage-container">
      <ul className="homepage-list">
        <li className="homepage-list-item"><NewPost /></li>
        {posts.map((post, index) => (
          <li key={index} className="homepage-list-item">
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage;