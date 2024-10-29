import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-0xl  mb-4">
          &copy; {new Date().getFullYear()} Elizabeth, Tshepo, Noluthando, Samuel. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-600">
            <i className=""><FaFacebook/></i>
          </a>
          <a href="#"  className="hover:text-blue-700">
            <i className=""><FaTwitter/></i>
          </a>
          <a href="#" className="hover:text-blue-700">
            <i className=""><FaLinkedin/></i>
          </a>
          <a href="#" className="hover:text-blue-700">
            <i className=""><FaInstagram/></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
