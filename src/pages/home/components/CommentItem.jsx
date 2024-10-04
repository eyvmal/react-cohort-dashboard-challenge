import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../../App.jsx";
import "./Comment.css"

function CommentItem({ comment }) {
  const[contact, setContact] = useState(null);
  const { contacts } = useContext(PostContext);
  
  const fetchContact = async () => {
    const contact = contacts.find((contact) => contact.id === comment.contactId);
    setContact(contact);
  }
  useEffect(() => {
    fetchContact();
  }, [comment.contactsId]);

  if (!contact) return <>Loading...</>;
  
  return (
    <div className="comment-container">
      <div className="comment-profile-image">
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
      <div className="comment-content-container">
        <h4>{contact.firstName} {contact.lastName}</h4>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default CommentItem;