'use client'
import Image from "next/image";
import { User } from "@/types/User";
import { FaArchive, FaEye, FaLock } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import SearchBar from "../Users/SearchBar";

const UserData: User[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    bio: "Tech enthusiast and developer",
    mobile: "+91 9876543210",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-01.png",
    createdAt: new Date("2023-01-15T10:00:00Z"),
    tasks: 25,
  },
  {
    id: 2,
    name: "Isha Patel",
    email: "isha.patel@example.com",
    bio: "Graphic designer and artist",
    mobile: "+91 9123456789",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-02.png",
    createdAt: new Date("2023-02-20T12:30:00Z"),
    tasks: 125,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    bio: "Software engineer and AI specialist",
    mobile: "+91 9988776655",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-03.png",
    createdAt: new Date("2023-03-10T14:45:00Z"),
    tasks: 523,
  },
  {
    id: 4,
    name: "Sanya Singh",
    email: "sanya.singh@example.com",
    bio: "Digital marketing expert",
    mobile: "+91 9911223344",
    role: "User",
    isActive: false,
    avatar: "/images/user/user-04.png",
    createdAt: new Date("2023-04-05T09:15:00Z"),
    tasks: 895,
  },
  {
    id: 5,
    name: "Karan Verma",
    email: "karan.verma@example.com",
    bio: "Full-stack developer and tech lover",
    mobile: "+91 8776654433",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-05.png",
    createdAt: new Date("2023-05-25T16:00:00Z"),
    tasks: 105,
  },
  {
    id: 6,
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    bio: "Content writer and blogger",
    mobile: "+91 8901234567",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-06.png",
    createdAt: new Date("2023-06-30T11:20:00Z"),
    tasks: 987,
  },
  {
    id: 7,
    name: "Priya Reddy",
    email: "priya.reddy@example.com",
    bio: "Entrepreneur and startup mentor",
    mobile: "+91 9501237890",
    role: "User",
    isActive: false,
    avatar: "/images/user/user-07.png",
    createdAt: new Date("2023-07-15T13:10:00Z"),
    tasks: 12,
  },
  {
    id: 8,
    name: "Ramesh Joshi",
    email: "ramesh.joshi@example.com",
    bio: "Product manager at a tech company",
    mobile: "+91 9000112233",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-08.png",
    createdAt: new Date("2023-08-22T17:45:00Z"),
    tasks: 56,
  },
];

const TableFour = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  // Filtering users based on the search term
  const filteredUsers = UserData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State for current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of users per page
  const usersPerPage = 5;

  // Calculate current page's users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Total number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Pagination function
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSearch = (value: string) => {
    console.log(value);
    setSearchTerm(value);
    setCurrentPage(1);
  };


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Total Students
        </h4>
        <div className="ms-auto">
          <SearchBar setSearchTerm={(value) => handleSearch(value)} />
        </div>
      </div>

      <div className="px-4 py-4 md:px-6 xl:px-7.5">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-stroke text-left dark:border-strokedark">
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-center hidden sm:table-cell">Email</th>
              <th className="py-2 px-4 text-center">Mobile</th>
              <th className="py-2 px-4 text-center">Joined date</th>
              <th className="py-2 px-4 text-center">Completed Tasks</th>
              <th className="py-2 px-4 text-center">View</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentUsers.map((user, key) => (
              <tr
                key={key}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="py-4 px-4 text-start">
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-start">
                    <Image
                      className="rounded-full"
                      src={user.avatar}
                      width={40}
                      height={40}
                      alt="user"
                    />
                    <span className="text-black dark:text-white">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center hidden sm:table-cell">
                  <span className="text-black dark:text-white">
                    {user.email}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-black dark:text-white">
                    {user.mobile}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-black dark:text-white">
                    {user.createdAt ? user.createdAt.toLocaleDateString() : "N/A"}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-meta-3 font-semibold">
                    {user.tasks}
                  </span>
                </td>
                <td className="py-4 px-0 text-center">
                  <div className="flex justify-center">
                    <div className="flex flex-1">
                      <Link href="/userProfile">
                        <button className="relative group items-center text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-lg py-4 rounded-full px-4 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                          <FaEye className="text-primary dark:text-white" />
                          <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 text-sm text-white bg-gray-800 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Profile
                          </span>
                        </button>
                      </Link>
                      <button className="relative group items-center text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-lg py-4 rounded-full px-4 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                        <FaLock className="text-primary dark:text-white" />
                        <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 text-sm text-white bg-gray-800 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Deactivate Account
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-center space-x-2 py-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TableFour;
