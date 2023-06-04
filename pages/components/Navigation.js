import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Navigation(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
      <a href="/" className="p-2 mr-4 inline-flex items-center text-2xl text-white font-bold tracking-wide">
          SummaryAI
      </a>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        onClick={handleToggle}
      >
        <FiMenu className="h-6 w-6" />
      </button>
      <div
        className={`${isOpen ? '' : 'hidden'} top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          <button
            className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-gray-400 ${props.searchType === 'articles' ? 'bg-gray-500' : ''
              }`}
            onClick={() => props.onSearchTypeChange('articles')}
          >
            <span>Articles</span>
          </button>
          <div className="mt-2 lg:mt-0 lg:w-1"></div> {/* Add a small distance */}
          <button
            className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-cyan-400 ${props.searchType === 'movies' ? 'bg-cyan-500' : ''
              }`}
            onClick={() => props.onSearchTypeChange('movies')}
          >
            <span>Movies</span>
          </button>
          <div className="mt-2 lg:mt-0 lg:w-1"></div> {/* Add a small distance */}
          <button
            className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-emerald-400 ${props.searchType === 'books' ? 'bg-emerald-500' : ''
              }`}
            onClick={() => props.onSearchTypeChange('books')}
          >
            <span>Books</span>
          </button>
        </div>
      </div>
    </nav>
  );
}