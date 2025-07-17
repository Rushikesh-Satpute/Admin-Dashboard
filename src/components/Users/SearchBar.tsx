import React, { ChangeEvent } from 'react';
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4 border-2 dark:border-0 dark:bg-gray-800 px-4 py-2 rounded-lg dark:shadow-md">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        className="w-full bg-transparent text-gray-700 dark:text-gray-200 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
      />
      <FaSearch className="w-5 h-5 text-primary dark:text-gray-400" />
    </div>
  );
};

export default SearchBar;
