'use client';
import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';

interface HistoryItem {
  id: number;
  template: string;
  response: string;
  date: string;
  words: number;
}

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ai-history');
    if (stored) {
      setHistoryData(JSON.parse(stored));
    }
  }, []);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-3xl font-bold mb-1">History</h1>
      <p className="text-gray-500 mb-6">Search your previously generated AI content</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Template</th>
              <th className="px-6 py-3">AI Resp</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Words</th>
              <th className="px-6 py-3">Copy</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {historyData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{item.template}</td>
                <td className="px-6 py-4 max-w-xs truncate">{item.response}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.words}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => copyText(item.response)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
