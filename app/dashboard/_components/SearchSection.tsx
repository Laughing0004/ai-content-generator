import { Search } from 'lucide-react';
import React, { useState } from 'react';

function SearchSection({ onSearchInput }: any) {
  const [debouncedValue, setDebouncedValue] = useState('');
  let debounceTimeout: NodeJS.Timeout;

  const handleSearchInputChange = (value: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
      onSearchInput(value);
    }, 300); // 300ms debounce time
  };

  return (
    <div className="p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white">
      <h2 className="text-3xl font-bold">Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => handleSearchInputChange(event.target.value)}
            className="bg-transparent w-full outline-none text-black"
            aria-label="Search templates"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
