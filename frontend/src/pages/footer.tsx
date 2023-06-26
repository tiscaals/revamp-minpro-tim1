import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 mx-auto">
          <div>
            <p className="text-sm hover:text-gray-400">Site Map</p>
            <div className="space-y-1">
              <p className="text-sm hover:text-gray-400">Programs</p>
              <p className="text-sm hover:text-gray-400">Course-Online</p>
              <p className="text-sm hover:text-gray-400">Job Hiring</p>
              <p className="text-sm hover:text-gray-400">About</p>
            </div>
          </div>
          <div>
            <p className="text-sm hover:text-gray-400">Our Campus</p>
            <div>
              <p className="text-sm hover:text-gray-400">Jl. Bukit Golf Hijau, No. 131, Babakan Madang</p>
            </div>
          </div>
          <div>
            <p className="text-sm hover:text-gray-400">Contact Us</p>
            <div>
              <p className="text-sm hover:text-gray-400">WA : 081360089190</p>
              <p className="text-sm hover:text-gray-400">Email : vendygulo@gmail.com</p>
            </div>
          </div>
          <div>
            <p className="text-sm hover:text-gray-400">Operational Hours</p>
            <div>
              <p className="text-sm hover:text-gray-400">Senin - Jumat</p>
              <p className="text-sm hover:text-gray-400">09.00 - 18.00</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <p className="text-sm">
            <FaFacebook className="h-6 w-6" />
          </p>
          <p className="text-sm">
            <FaTwitter className="h-6 w-6" />
          </p>
          <p className="text-sm">
            <FaInstagram className="h-6 w-6" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;