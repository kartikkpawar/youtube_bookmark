import React from "react";
import Lottie from "react-lottie";
import "./header.css";
import animationData from "./vid_ani.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Header = () => {
  return (
    <div className="header">
      <div className="animation">
        <Lottie options={defaultOptions} />
      </div>
      <h2 className="htitle">Youtube Bookmark</h2>
    </div>
  );
};

export default Header;
