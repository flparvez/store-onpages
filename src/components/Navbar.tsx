'use client';

import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import SearchProducutByName from '@/components/SearchProducutByName'
import logo from '../../public/download.webp'
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { ShoppingCart } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const cart = useSelector((state: any) => state.cart);

  return (
    <nav className="bg-white sm:shadow-md sticky top-0 z-50">
      <div className="sm:max-w-3xl w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <Link href="/">
          <Image className='w-7 mx-auto my-2'  src={logo} alt="logo" width={100} height={100} />
          </Link>

          <div className="flex-shrink-0">
       
              <Link href="/profile">
                <h2 className="sm:text-muted text-sm font-bold text-gray-800">Profile</h2>
              </Link>
          
          </div>

          {/* Category Dropdown */}
          <div className="hidden md:block ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/products/unique-store">Unique Store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/headphone">Headphone</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/smart-watch">Smart Watch</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Cart and Hamburger */}
          <div className="flex items-center">
            <Link href="/cart">
              <div className="relative inline-flex">
                <ShoppingCart className="w-10 h-8 text-gray-700" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full">
                  ({cart.items.reduce((acc: any, item: any) => acc + item.quantity, 0)})
                </span>
              </div>
            </Link>
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu}>
                {isOpen ? <AiOutlineClose size={23} /> : <AiOutlineMenu size={23} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className=" w-full sm:max-w-full space-y-1">
        <SearchProducutByName />
        </div>
      </div>

      {/* Marquee */}
      <div className="font-bold">
        <Marquee >
          <br />
          আসসালামু আলাইকুম সম্মানিত সদস্য আপনাকে অভিনন্দন ওয়েবসাইটে প্রবেশ করার জন্য। আমাদের কাছে পেয়ে যাবেন টেকসই নিত্য প্রয়োজনীয় ইলেকট্রনিক মালামাল। আপনার পছন্দের প্রোডাক্ট এড কার্ড করে এখনই অর্ডার করুন।
        </Marquee>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <h2 onClick={toggleMenu} className="block text-gray-800 hover:text-gray-600">Home</h2>
          </Link>
        
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full text-left">Categories</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
              <Link href="/products/unique-store">Unique Store</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href="/products/headphone">Headphone</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href="/products/smart-watch">Smart Watch</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
