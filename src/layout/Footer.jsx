import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0a192f] text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
        {/* Brand Info */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-white">
            WattWise
          </h2>
          <p className="text-sm mt-3 leading-relaxed text-gray-400">
            WattWise helps you monitor and visualize electricity consumption for every meter — 
            uncover patterns, reduce waste, and make data-driven energy decisions with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-purple-400">All Products</a></li>
            <li><a href="#" className="hover:text-purple-400">Dashboard</a></li>
            <li><a href="#" className="hover:text-purple-400">Login</a></li>
            <li><a href="#" className="hover:text-purple-400">Register</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-purple-400">Electronics</a></li>
            <li><a href="#" className="hover:text-purple-400">Fashion</a></li>
            <li><a href="#" className="hover:text-purple-400">Home & Living</a></li>
            <li><a href="#" className="hover:text-purple-400">Groceries</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#" className="hover:text-purple-400"><FaGithub/></a>
            <a href="#" className="hover:text-purple-400"><FaXTwitter /></a>
            <a href="#" className="hover:text-purple-400"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2025 WattWise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
