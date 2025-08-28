import React from "react";
import { assets } from "../assets/assets";

function Header() {
  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Profile Image */}
      <img 
        src={assets.header_img} 
        className="w-36 h-36 rounded-full mb-6 shadow-lg ring-4 ring-gray-100"
        alt="profile" 
      />

      {/* Main Title */}
      <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
        Hey Developer 
        <img src={assets.hand_wave} className="w-8 h-8 animate-bounce" alt="wave" />
      </h1>

      {/* Sub Title */}
      <h2 className="text-3xl sm:text-5xl font-bold mb-4 mt-2 text-gray-900">
        Welcome to Our App 🚀
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md text-gray-600 leading-relaxed">
        Let's start with a quick product tour — you'll be up and running in no time.
      </p>

      {/* Button */}
      <button className="border border-gray-500 rounded-full px-8 py-2.5 text-gray-800 font-medium hover:bg-gray-100 hover:shadow-md transition-all">
        Get Started
      </button>
    </div>
  );
}

export default Header;
