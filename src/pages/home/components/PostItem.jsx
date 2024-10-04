import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../../App.jsx";
import {ApiContext} from "../../../api/ApiProvider.jsx";
import CommentItem from "./CommentItem.jsx";
import NewComment from "./NewComment.jsx";
import "./Post.css"

function PostItem({post}) {
  const {contacts, getInitials} = useContext(PostContext)
  const [contact, setContact] = useState(null)
  const [comments, setComments] = useState(null)
  const [initials, setInitials] = useState("")
  const [showAllComments, setShowAllComments] = useState(true)
  const {getComments} = useContext(ApiContext);

  const findContact = async () => {
    const foundContact = contacts.find((contact) => contact.id === post.contactId)
    setContact(foundContact || null);
    setInitials(getInitials(contact))
  }
  useEffect(() => {
    findContact();
  }, [contacts, post.contactId]);

  const fetchComments = async () => {
    const comments = await getComments(post.id);
    setComments(comments);
    if (comments.length > 3) setShowAllComments(false);
  }
  useEffect(() => {
    fetchComments();
  }, [post.id]);

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  }

  if (!contact) return <>Loading...</>
  if (!comments) return <>Loading...</>

  return (
    <div className="post-item-container">
      <div className="post-item-header">
        <div className="post-profile-image">
          {contact.profileImage ? (
            <img
              src={contact.profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="circle" style={{backgroundColor: contact.favouriteColour}}>
              {initials}
            </div>
          )}
        </div>
        <div className="post-item-header-text">
          <h4 style={{fontSize: "18px"}}>{contact.firstName} {contact.lastName}</h4>
          <p>{post.title}</p>
        </div>
      </div>
      <div className="post-item-content">
        <p>{post.content}</p>
      </div>
      <div className="post-item-comments-container">
        <ul>
          {!showAllComments && (
            <li>
              <p
                onClick={toggleShowAllComments}
                className="comments-toggle"
                style={{
                  fontStyle: "italic",
                  cursor: "pointer"
              }}
              >
                See previous comments</p>
            </li>
          )}
          {comments
            .slice(showAllComments ? 0 : -3)
            .map((comment, index) => (
              <li key={index}>
                <CommentItem comment={comment}/>
              </li>
            ))}
          <li>
            <NewComment post={post}/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PostItem;