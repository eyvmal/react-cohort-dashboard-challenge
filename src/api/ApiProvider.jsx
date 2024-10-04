import {createContext} from "react";

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const getPosts = async () => {
    const response = await fetch("https://boolean-uk-api-server.fly.dev/eyvmal/post");
    return await response.json()
  }
  
  const getComments = async (id) => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/post/${Number(id)}/comment`);
    return await response.json()
  }
  
  const getContacts = async () => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/contact`);
    return await response.json()
  }

  const getContactById = async (id) => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/contact/${id}`);
    return await response.json()
  }
  
  const createNewPost = async (post) => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return await response.json();
  }
  
  const createNewComment = async (comment) => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/post/${comment.postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return await response.json();
  }

  return (
    <ApiContext.Provider value={{ getPosts, getComments, getContacts, getContactById, createNewPost, createNewComment }}>
      {children}
    </ApiContext.Provider>
  );
};