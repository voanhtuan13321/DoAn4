import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  const renderChatbox = () => {
    return (
      <div className="position-fixed top-50 end-0 translate-middle-y zindex">
        <button className="bsdb p-2 btn btn-warning ">Chat box</button>
      </div>
    );
  };
  return (
    <div className="position-relative">
      {renderChatbox()}
      <div className="zi">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default LayOut;
