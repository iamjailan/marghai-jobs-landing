import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Image
            width={40}
            height={40}
            src={"/logo.png"}
            className="rounded-full"
            alt="marghai-logo"
          />
          <span className="text-2xl font-bold">Marghai</span>
        </div>
        <p className="text-gray-400 mb-4">
          Connecting Talent with Opportunity in Afghanistan
        </p>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Marghai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
