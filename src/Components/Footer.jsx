import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Dairy Gold Branding */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/dairy-gold-logo.png" 
              alt="Dairy Gold Logo" 
              className="h-8 w-auto mr-3 filter brightness-0 invert"
            />
            <div>
              <h3 className="text-lg font-bold">Dairy Gold Zambia Limited</h3>
              <p className="text-sm text-gray-300">Makers of Ama Sip Sip Maheu</p>
            </div>
          </div>

          {/* Company Information */}
          <div className="text-center md:text-right">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>www.dairygold.co.zm</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Zambia</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Tradekings Group | Equipment Management System
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-2 md:mb-0">
            <p>© 2025 Dairy Gold Zambia Limited. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
              EAT WELL. DRINK WELL. FEEL GOOD.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;