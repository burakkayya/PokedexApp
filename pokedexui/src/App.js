import './App.css';
import React from 'react';
import Signin from './SignIn';
import Signup from './SignUp';
import UserPage from './UserPage';
import WishList from './WishList';
import CatchList from './CatchList';
import AdminPage from './AdminPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from './UserList';
function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Home" element={<UserPage />} />
            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/CatchList" element={<CatchList />} />
            <Route path="/Admin" element={<AdminPage />} />
            <Route path="/Pokemons" element={<AdminPage />} />
            <Route path="/Users" element={<UserList />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </div>
  );
}

export default App;
