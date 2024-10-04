import {useContext, useEffect, useState} from "react";
import {PostContext, UserContext} from "../../../App.jsx";
import {ApiContext} from "../../../api/ApiProvider.jsx";

function NewComment({post}) {
  const [initials, setInitials] = useState("")
  const [comment, setComment] = useState({
    content: '',
    postId: post.id,
    contactId: 0
  })
  const {getInitials} = useContext(PostContext)
  const {user} = useContext(UserContext);
  const {createNewComment} = useContext(ApiContext);

  useEffect(() => {
    if (user) {
      const userInitials = getInitials(user);
      setInitials(userInitials);

      setComment((prevComment) => ({
        ...prevComment,
        contactId: user.id
      }));
    }
  }, [user, getInitials]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewComment(comment)
  }

  return (
    <>
      <div className="comment-profile-image">
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
      <form className="new-comment-form" onSubmit={handleSubmit}>
        <label htmlFor="new-comment" className="form-label">New Comment</label>
        <input
          className="new-comment-input"
          type="text"
          name="content"
          value={comment.content}
          onChange={handleInputChange}
        />
        <button className="new-comment-button" type="submit">Comment</button>
      </form>
    </>
  )
}

export default NewComment;