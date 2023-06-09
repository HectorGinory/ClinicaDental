import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import NewQuote from "../NewQuote/NewQuote";
import QuoteId from "../../common/QuoteId/QuoteId";

const Body = () => {
  return (
    <div className="body flex-c-c">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newquote" element={<NewQuote />} />
        <Route path="/quote/:quoteId" element={<QuoteId />} />
      </Routes>
    </div>
  );
};

export default Body;
