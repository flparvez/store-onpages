"use client";
import React from 'react';
import Link from 'next/link';
import { FaFacebookMessenger } from 'react-icons/fa';

const LiveChatButton = () => {
  return (
    <div className="fixed bottom-16 right-4 z-50">
      <Link target='_blank' href="https://www.facebook.com/uniquestorebd23" passHref>
        <h
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaFacebookMessenger size={24} />
        </h>
      </Link>
    </div>
  );
};

export default LiveChatButton;
