import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/pcap_csv", label: "Extract Pcap" },
    { href: "/models", label: "Model Selection" },
    { href: "/predict", label: "Inference Sequence Models" },
    { href: "/predict_ml", label: "Inference ML Models" },
    { href: "/datavisualization", label: "Data Visualization" }
   
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full z-50 top-0">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-auto sm:h-10 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NeuralNetIoT</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="-mr-2 -my-2 md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href} // Use "to" prop from react-router-dom
                className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href} // Use "to" prop from react-router-dom
                  className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
