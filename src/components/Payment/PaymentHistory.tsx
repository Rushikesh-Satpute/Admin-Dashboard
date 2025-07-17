'use client'
import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";

ChartJS.register(
    CategoryScale,   // For X-axis scale
    LinearScale,     // For Y-axis scale
    BarElement,      // For Bar charts
    ArcElement,      // For Pie & Doughnut charts
    Tooltip,         // Tooltips on hover
    Legend,          // Legend to show chart series
    LineElement,     // For Line charts
    PointElement     // For Point elements in Line charts
);

interface PaymentHistory {
    companyName: string;
    paymentAmount: number;
    paymentDate: string;
    paymentStatus: string;
}

const PaymentHistory: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);

    const paymentData: PaymentHistory[] = [
        { companyName: "TechCo", paymentAmount: 5000, paymentDate: "2024-12-01", paymentStatus: "Completed" },
        { companyName: "Innovators Ltd", paymentAmount: 8000, paymentDate: "2024-12-02", paymentStatus: "Pending" },
        { companyName: "Web Solutions", paymentAmount: 3000, paymentDate: "2024-12-03", paymentStatus: "Completed" },
        { companyName: "CodeFactory", paymentAmount: 1500, paymentDate: "2024-12-04", paymentStatus: "Completed" },
        { companyName: "NextGen Tech", paymentAmount: 12000, paymentDate: "2024-12-05", paymentStatus: "Failed" },
        { companyName: "CloudWorks", paymentAmount: 7000, paymentDate: "2024-12-06", paymentStatus: "Completed" },
        { companyName: "DataFlow", paymentAmount: 3500, paymentDate: "2024-12-07", paymentStatus: "Pending" },
        { companyName: "GreenTech", paymentAmount: 2200, paymentDate: "2024-12-08", paymentStatus: "Completed" },
        { companyName: "BrightIdeas", paymentAmount: 4000, paymentDate: "2024-12-09", paymentStatus: "Completed" },
        { companyName: "QuantumWorks", paymentAmount: 5000, paymentDate: "2024-12-10", paymentStatus: "Failed" },
    ];

    const filteredData = paymentData.filter((payment) =>
        payment.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPayments = paymentData.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const averagePayment = totalPayments / paymentData.length;

    const paymentStatusStats = {
        labels: ["Completed", "Pending", "Failed"],
        datasets: [
            {
                data: [
                    paymentData.filter((data) => data.paymentStatus === "Completed").length,
                    paymentData.filter((data) => data.paymentStatus === "Pending").length,
                    paymentData.filter((data) => data.paymentStatus === "Failed").length,
                ],
                backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
            },
        ],
    };

    const paymentAmountStats = {
        labels: paymentData.map((payment) => payment.companyName),
        datasets: [
            {
                label: "Payment Amount ($)",
                data: paymentData.map((payment) => payment.paymentAmount),
                backgroundColor: "#3B82F6",
            },
        ],
    };

    const paymentTrend = {
        labels: paymentData.map((payment) => payment.paymentDate),
        datasets: [
            {
                label: "Payments Trend",
                data: paymentData.map((payment) => payment.paymentAmount),
                fill: false,
                borderColor: "#10B981",
                tension: 0.1,
            },
        ],
    };

    const paymentStatusPieChart = {
        labels: ["Completed", "Pending", "Failed"],
        datasets: [
            {
                data: [
                    paymentData.filter((data) => data.paymentStatus === "Completed").length,
                    paymentData.filter((data) => data.paymentStatus === "Pending").length,
                    paymentData.filter((data) => data.paymentStatus === "Failed").length,
                ],
                backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
            },
        ],
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1); // Reset to the first page if currentPage exceeds totalPages.
        }
    }, [filteredData.length]);

    return (
        <div className="p-6 bg-slate-100 dark:bg-boxdark-2 text-slate-800 dark:text-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold dark:text-white">Payment History</h1>
                    <input
                        type="text"
                        placeholder="Search company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col space-y-6">
                        <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg flex-1">
                            <h2 className="text-lg font-semibold mb-4 dark:text-white">Total Payments</h2>
                            <p className="text-2xl font-bold">${totalPayments}</p>
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg flex-1">
                            <h2 className="text-lg font-semibold mb-4 dark:text-white">Average Payment</h2>
                            <p className="text-2xl font-bold">${averagePayment.toFixed(2)}</p>
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg flex-1">
                            <h2 className="text-lg font-semibold mb-4 dark:text-white">Total Pending Payment</h2>
                            <p className="text-2xl font-bold">{averagePayment.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg flex-1 max-h-full">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Payment Status Breakdown</h2>
                        <div className="h-[85%] w-full">
                            <Pie
                                className="mx-auto"
                                data={paymentStatusPieChart} />
                        </div>
                    </div>
                </div>



                {/* Graph Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Payment Amount by Company</h2>
                        <Bar data={paymentAmountStats} />
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Payments Trend Over Time</h2>
                        <Line data={paymentTrend} />
                    </div>
                </div>

                {/* Table Section */}
                <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Payment History</h2>
                    <table className="w-full border-collapse table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="border-b py-3 px-4 text-left dark:border-slate-700">Company Name</th>
                                <th className="border-b py-3 px-4 text-left dark:border-slate-700">Payment Amount</th>
                                <th className="border-b py-3 px-4 text-left dark:border-slate-700">Payment Date</th>
                                <th className="border-b py-3 px-4 text-left dark:border-slate-700">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((data, index) => (
                                <tr key={index} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                                    <td className="border-b py-3 px-4">{data.companyName}</td>
                                    <td className="border-b py-3 px-4">${data.paymentAmount}</td>
                                    <td className="border-b py-3 px-4">{data.paymentDate}</td>
                                    <td className="border-b py-3 px-4">{data.paymentStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-slate-700 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
