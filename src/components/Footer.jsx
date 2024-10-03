import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Quality Is Here</h2>
        <div className="flex justify-center items-center space-x-4">
          <Link href="https://www.facebook.com/uniquestorebd23">
            <h2
              className="text-gray-400 hover:text-white transition duration-300"
           
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} />
            </h2>
          </Link>
        </div>
        <p className="mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} Unique Store Bd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
