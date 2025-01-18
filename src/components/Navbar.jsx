import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthButton from "./AuthButton"; // Import the AuthButton component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const NavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-6 py-2 text-lg font-medium relative overflow-hidden rounded-3xl
        ${isActive ? "text-blue-500" : "text-white"}
        group hover:text-blue-500 transition-colors duration-300`
      }
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
    </NavLink>
  );

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/news", label: "News" },
    { to: "/reviews", label: "Reviews" },
    { to: "/developer-interviews", label: "Developer-Interviews" },
    { to: "/patch-Notes", label: "Patch-Notes" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-black via-blue-900 to-black shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center h-16">
          {/* Hamburger menu */}
          <button 
            onClick={toggleMenu} 
            className="hamburger-button md:hidden px-6 p-3 rounded-3xl transition-all duration-200 hover:bg-gradient-to-r hover:from-black hover:via-blue-900 hover:to-black"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full px-6">
            <div className="flex items-center justify-start flex-1 gap-8">
              {navLinks.map((link) => (
                <NavItem key={link.to} {...link} />
              ))}
            </div>

            {/* AuthButton Component (Desktop) */}
            <div className="flex items-center gap-6">
              <AuthButton />
            </div>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        <div 
          className={`mobile-menu fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-black via-blue-900 to-black transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
        >
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <NavItem 
                key={link.to} 
                {...link} 
                onClick={() => setIsOpen(false)} 
              />
            ))}
            {/* AuthButton Component (Mobile) */}
            <AuthButton />
          </div>
        </div>
      </nav>
      {/* Add a spacer div to prevent content from going under the navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
