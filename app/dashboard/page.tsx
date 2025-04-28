"use client";
import React, { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

function Dashboard() {
  // Initialize userSearchInput with an empty string to avoid undefined issues
  const [userSearchInput, setUserSearchInput] = useState<string>('');

  return (
    <div>
      {/* Search Section */}
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />

      {/* Template List Section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
