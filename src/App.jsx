import {createContext, useContext, useEffect, useState} from 'react'
import './App.css'
import Navbar from "./pages/shared/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Header from "./pages/shared/Header.jsx";
import {ApiContext} from "./api/ApiProvider.jsx";

export const PostContext = createContext({});
export const UserContext = createContext({});

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const {getPosts, getContacts, getContactById} = useContext(ApiContext);

  const initializeData = async () => {
    // Fetch all posts
    const jsonPostData = await getPosts();
    const sortedPostData = jsonPostData.sort((a, b) => b.id - a.id);
    setPosts(sortedPostData);

    // Fetch all contacts
    const jsonContactData = await getContacts();
    setContacts(jsonContactData);

    // Set this user as logged in
    const user = await getContactById(1)
    setUser(user);
  };

  const getInitials = (contact) => {
    if (!contact || !contact.firstName || !contact.lastName) {
      return ""; // Return an empty string or placeholder
    }
    
    const fullName = `${contact.firstName} ${contact.lastName}`
    const nameParts = fullName.split(' ').filter(Boolean);

    const initials = nameParts.map(part => {
      const letter = part.match(/[a-zA-Z]/);
      return letter ? letter[0].toUpperCase() : '';
    });
    return initials.join('');
  }

  useEffect(() => {
    initializeData();
  }, []);


  return (
    <UserContext.Provider value={{user}}>
      <PostContext.Provider value={{posts, contacts, getInitials, initializeData}}>
        <Header/>
        <div className="app-layout">
          <Navbar/>
          <div className="content">

            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
          </div>
        </div>
      </PostContext.Provider>
    </UserContext.Provider>
  )
}

export default App