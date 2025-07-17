'use client'
import { useState, useEffect } from "react";
import {
    Bar,
    Pie,
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { FaSearch, FaFilter } from "react-icons/fa";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

interface DomainData {
    domain: string;
    tasksListed: number;
    tasksCompleted: number;
}

const DomainAnalytics = () => {
    const [domainData, setDomainData] = useState<DomainData[]>([]);
    const [filteredData, setFilteredData] = useState<DomainData[]>([]);
    const [search, setSearch] = useState("");
    const [completionFilter, setCompletionFilter] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        // Simulated API Call
        const fetchData = async () => {
            const data: DomainData[] = [
                { domain: "Web Development", tasksListed: 150, tasksCompleted: 120 },
                { domain: "Data Science", tasksListed: 100, tasksCompleted: 70 },
                { domain: "UI/UX Design", tasksListed: 80, tasksCompleted: 60 },
                { domain: "Cybersecurity", tasksListed: 50, tasksCompleted: 45 },
                { domain: "Mobile App Development", tasksListed: 90, tasksCompleted: 75 },
                { domain: "Game Development", tasksListed: 40, tasksCompleted: 25 },
                { domain: "DevOps", tasksListed: 70, tasksCompleted: 50 },
            ];
            setDomainData(data);
            setFilteredData(data);
        };

        fetchData();
    }, []);

    // Filters the data based on completion rate
    useEffect(() => {
        let data = domainData;
        if (search) {
            data = data.filter((domain) =>
                domain.domain.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (completionFilter !== null) {
            data = data.filter(
                (domain) =>
                    (domain.tasksCompleted / domain.tasksListed) * 100 >= completionFilter
            );
        }
        setFilteredData(data);
    }, [search, completionFilter, domainData]);

    const barChartData = {
        labels: filteredData.map((domain) => domain.domain),
        datasets: [
            {
                label: "Tasks Listed",
                data: filteredData.map((domain) => domain.tasksListed),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
                label: "Tasks Completed",
                data: filteredData.map((domain) => domain.tasksCompleted),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const pieChartData = {
        labels: filteredData.map((domain) => domain.domain),
        datasets: [
            {
                label: "Task Distribution",
                data: filteredData.map((domain) => domain.tasksListed),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#B39DDB",
                ],
            },
        ],
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setCompletionFilter(value || null);
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentTableData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Domain-Wise Task Analytics
            </h1>

            {/* Filters Section */}
            <div className="flex items-center justify-between mb-6 gap-4">
                <div className="relative">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Domains..."
                        value={search}
                        onChange={handleSearch}
                        className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="relative">
                    <FaFilter className="absolute top-3 left-3 text-gray-400" />
                    <select
                        onChange={handleFilterChange}
                        className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="">All Completion Rates</option>
                        <option value="50">50% and above</option>
                        <option value="75">75% and above</option>
                        <option value="90">90% and above</option>
                    </select>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart */}
                <div className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        Tasks Listed vs Completed
                    </h2>
                    <Bar
                        data={barChartData}
                        options={{ responsive: true, maintainAspectRatio: true }}
                        style={{ maxHeight: "400px" }} // Constrain the height
                    />
                </div>

                {/* Pie Chart */}
                <div className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        Task Distribution by Domain
                    </h2>
                    <Pie
                        data={pieChartData}
                        options={{ responsive: true, maintainAspectRatio: true }}
                        style={{ maxHeight: "400px" }} // Constrain the height
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Domain Details</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Domain</th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Tasks Listed
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Tasks Completed
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Completion Rate (%)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((domain, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {index + 1 + (currentPage - 1) * rowsPerPage}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {domain.domain}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {domain.tasksListed}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {domain.tasksCompleted}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {(
                                            (domain.tasksCompleted / domain.tasksListed) *
                                            100
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded ${currentPage === 1
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded ${currentPage === totalPages
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DomainAnalytics;
