'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../company/Modal';
import Pagination from '../Users/Pagination';

interface Payment {
  date: string;
  amount: number;
}

interface Company {
  name: string;
  totalTokens: number;
  usedTokens: number;
  totalSpend: number;
  tasksListed: number;
  contact: string;
  subscription: string;
  recentPayments: { date: string; amount: number }[];
}


const companyData: Company[] = [
  {
    name: 'FutureTech Labs',
    totalTokens: 600,
    usedTokens: 300,
    totalSpend: 180,
    tasksListed: 70,
    contact: 'contact@futuretechlabs.com',
    subscription: 'Standard',
    recentPayments: [
      { date: '2024-12-10', amount: 100 },
      { date: '2024-11-05', amount: 80 },
    ],
  },
  {
    name: 'Creative Dynamics',
    totalTokens: 1000,
    usedTokens: 450,
    totalSpend: 500,
    tasksListed: 120,
    contact: 'contact@creativedynamics.com',
    subscription: 'Premium',
    recentPayments: [
      { date: '2024-12-18', amount: 250 },
      { date: '2024-11-12', amount: 250 },
    ],
  },
  {
    name: 'SmartTech Solutions',
    totalTokens: 1200,
    usedTokens: 800,
    totalSpend: 600,
    tasksListed: 150,
    contact: 'contact@smarttechsolutions.com',
    subscription: 'Enterprise',
    recentPayments: [
      { date: '2024-12-22', amount: 300 },
      { date: '2024-11-18', amount: 300 },
    ],
  },
  {
    name: 'Innovative Enterprises',
    totalTokens: 700,
    usedTokens: 500,
    totalSpend: 350,
    tasksListed: 60,
    contact: 'contact@innovativeenterprises.com',
    subscription: 'Standard',
    recentPayments: [
      { date: '2024-12-05', amount: 150 },
      { date: '2024-11-30', amount: 200 },
    ],
  },
  {
    name: 'Visionary Systems',
    totalTokens: 900,
    usedTokens: 200,
    totalSpend: 250,
    tasksListed: 90,
    contact: 'contact@visionarysystems.com',
    subscription: 'Premium',
    recentPayments: [
      { date: '2024-12-12', amount: 150 },
      { date: '2024-11-25', amount: 100 },
    ],
  },
];

const TableTwo = () => {
  const [companies, setCompanies] = useState<Company[]>(companyData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [sortKey, setSortKey] = useState<keyof Company>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // State for current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of users per page
  const usersPerPage = 5;

  // Calculate current page's users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Pagination function
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: keyof Company) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";

    if (sortKey === key && sortOrder === newOrder) {
      return; // Do nothing if already sorted with the same key and order
    }
    const sortedCompanies = [...companies].sort((a, b) => {
      if (key === "name") {
        return newOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0; // Default in case of invalid key
    });

    // Update both the sorting state and the companies data at the same time
    setSortKey(key);
    setSortOrder(newOrder);
    setCompanies(sortedCompanies);
  };



  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredCompanies.slice(indexOfFirstUser, indexOfLastUser);
  // Total number of pages
  const totalPages = Math.ceil(filteredCompanies.length / usersPerPage);

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Total Tokens', 'Used Tokens', 'Remaining Tokens', 'Total Spend'],
      ...companies.map((company) => [
        company.name,
        company.totalTokens,
        company.usedTokens,
        company.totalTokens - company.usedTokens,
        company.totalSpend,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'company_data.csv';
    link.click();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Company Token Management
        </h4>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Company..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-md border border-stroke bg-gray-50 px-4 py-2 text-sm focus:border-primary focus:ring-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
          />
          <button
            onClick={exportToCSV}
            className="rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
          >
            Export CSV
          </button>

        </div>
      </div>

      <div className="px-4 py-4 md:px-6 xl:px-7.5">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th
                className={`cursor-pointer text-start ${sortKey === "name" ? "text-blue-500" : ""
                  }`}
                onClick={() => handleSort("name")}
              >
                Company Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className={`cursor-pointer ${sortKey === "totalTokens" ? "text-blue-500" : ""
                  }`}
                onClick={() => handleSort("totalTokens")}
              >
                Total Tokens {sortKey === "totalTokens" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>Used Tokens</th>
              <th>Remaining</th>
              <th
                className={`cursor-pointer ${sortKey === "totalSpend" ? "text-blue-500" : ""
                  }`}
                onClick={() => handleSort("totalSpend")}
              >
                Total Spend {sortKey === "totalSpend" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((company, index) => (
              <tr
                key={index}
                className="dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700 border-gray-300"
                onClick={() => setSelectedCompany(company)}
              >
                <td className="py-4 px-4">{company.name}</td>
                <td className="py-4 px-4 text-center">{company.totalTokens}</td>
                <td className="py-4 px-4 text-center">{company.usedTokens}</td>
                <td className="py-4 px-4 text-center">
                  {company.totalTokens - company.usedTokens}
                </td>
                <td className="py-4 px-4 text-center">${company.totalSpend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={paginate} />


      {selectedCompany && (
        <Modal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default TableTwo;
