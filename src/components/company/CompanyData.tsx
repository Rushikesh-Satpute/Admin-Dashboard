'use client'
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const CompanyData: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);

    // Example task data for technical domains
    const taskDomainData = [
        { domain: "Frontend", tasksCompleted: 120, totalTasks: 150 },
        { domain: "Backend", tasksCompleted: 80, totalTasks: 100 },
        { domain: "DevOps", tasksCompleted: 50, totalTasks: 60 },
        { domain: "Machine Learning", tasksCompleted: 30, totalTasks: 50 },
        { domain: "Blockchain", tasksCompleted: 40, totalTasks: 60 },
        { domain: "Mobile Development", tasksCompleted: 100, totalTasks: 120 },
    ];

    const filteredData = taskDomainData.filter((data) =>
        data.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const barChartData = {
        labels: taskDomainData.map((data) => data.domain),
        datasets: [
            {
                label: "Tasks Completed",
                data: taskDomainData.map((data) => data.tasksCompleted),
                backgroundColor: "rgba(37, 99, 235, 0.7)", // Blue
            },
            {
                label: "Total Tasks",
                data: taskDomainData.map((data) => data.totalTasks),
                backgroundColor: "rgba(156, 163, 175, 0.7)", // Gray
            },
        ],
    };

    const pieChartData = {
        labels: taskDomainData.map((data) => data.domain),
        datasets: [
            {
                data: taskDomainData.map((data) => data.tasksCompleted),
                backgroundColor: [
                    "#1D4ED8", // Blue
                    "#22C55E", // Green
                    "#FACC15", // Yellow
                    "#FB923C", // Orange
                    "#EC4899", // Pink
                    "#3B82F6", // Light Blue
                ],
            },
        ],
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1); // Reset to the first page if currentPage exceeds totalPages.
        }
    }, [filteredData.length]);

    return (
        <div className="bg-gray-100 dark:bg-boxdark-2 text-gray-800 dark:text-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold dark:text-gray-100">Technical Task Domains Analytics</h1>
                    <input
                        type="text"
                        placeholder="Search technical domain..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Task Completion Overview</h2>
                        <Bar
                            data={barChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: "top", labels: { color: "#4B5563" } },
                                },
                                scales: {
                                    x: { ticks: { color: "#4B5563" } },
                                    y: { ticks: { color: "#4B5563" } },
                                },
                            }}
                            style={{ maxHeight: "300px" }}
                        />
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Task Domain Distribution</h2>
                        <Pie
                            data={pieChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: "top", labels: { color: "#4B5563" } },
                                },
                            }}
                            style={{ maxHeight: "300px" }}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Task Domain-wise Data</h2>
                    <table className="w-full border-collapse table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="border-b py-3 px-4 text-left dark:border-gray-700">Domain</th>
                                <th className="border-b py-3 px-4 text-left dark:border-gray-700">Tasks Completed</th>
                                <th className="border-b py-3 px-4 text-left dark:border-gray-700">Total Tasks</th>
                                <th className="border-b py-3 px-4 text-left dark:border-gray-700">Completion Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((data, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="py-3 px-4">{data.domain}</td>
                                    <td className="py-3 px-4">{data.tasksCompleted}</td>
                                    <td className="py-3 px-4">{data.totalTasks}</td>
                                    <td className="py-3 px-4">
                                        {((data.tasksCompleted / data.totalTasks) * 100).toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border rounded ${currentPage === 1
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                                : "bg-blue-500 text-white dark:bg-blue-600"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 border rounded ${currentPage === totalPages
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                                : "bg-blue-500 text-white dark:bg-blue-600"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyData;
