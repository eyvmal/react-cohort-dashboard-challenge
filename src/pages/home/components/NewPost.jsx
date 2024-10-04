import "./Post.css"
import {useContext, useEffect, useState} from "react";
import {PostContext, UserContext} from "../../../App.jsx";
import {ApiContext} from "../../../api/ApiProvider.jsx";

function NewPost() {
  const [initials, setInitials] = useState("")
  const [post, setPost] = useState({
    title: '',
    content: '',
    contactId: null
  })
  const {getInitials} = useContext(PostContext)
  const {user} = useContext(UserContext);
  const {createNewPost} = useContext(ApiContext);

  useEffect(() => {
    if (user) {
      const userInitials = getInitials(user);
      setInitials(userInitials);

      setPost((prevPost) => ({
        ...prevPost,
        contactId: user.id
      }));
    }
  }, [user, getInitials]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);
    await createNewPost(post)
  }

  return (
    <div className="post-item-container">
      <div className="post-profile-image">
        {!user ? (
          <div>Loading...</div>
        ) : user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="circle" style={{backgroundColor: user.favouriteColour}}>
            {initials}
          </div>
        )}
      </div>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <label htmlFor="new-post" className="form-label">New Post</label>
        <input
          className="new-post-input"
          name="title"
          type="text"
          value={post.title}
          onChange={handleInputChange}
        />
        <input
          className="new-post-input"
          name="content"
          type="text"
          value={post.content}
          onChange={handleInputChange}
        />
        <button className="new-post-button" type="submit">Post</button>
      </form>
    </div>
  )
}

export default NewPost;