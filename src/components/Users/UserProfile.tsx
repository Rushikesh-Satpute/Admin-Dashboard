'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { User } from '@/types/User';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Data: User = {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    bio: "Tech enthusiast and developer",
    mobile: "+91 9876543210",
    role: "User",
    isActive: true,
    avatar: "/images/user/user-01.png",
    dob: new Date("2004-08-08T10:00:00Z"),
    createdAt: new Date("2023-01-15T10:00:00Z"),
    tasksCompleted: 45,
    tasksPending: 5,
    activity: [
        { id: 1, action: 'Completed task "Design Homepage"', date: '2024-12-28' },
        { id: 2, action: 'Started task "Implement User Profile"', date: '2024-12-27' },
        { id: 3, action: 'Updated settings', date: '2024-12-26' },
    ],
    taskStats: [10, 15, 25, 30, 40, 45, 50], // Example data for task completion over time
};

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile'); // To switch between tabs

    // Line chart options
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [10, 15, 25, 30, 40, 45, 50],
                fill: true, // Adding fill for the area beneath the line
                backgroundColor: 'rgba(59,130,246,0.2)', // Light gradient for area fill
                borderColor: 'rgb(59,130,246)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(59,130,246)',
                pointBorderColor: '#fff',
                pointRadius: 5,
                tension: 0.4,
                hoverBackgroundColor: 'rgb(59,130,246)',
                hoverBorderColor: '#fff',
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tasks Completed Over Time',
                font: {
                    size: 18,
                    weight: 'bold',
                    family: 'Arial, sans-serif',
                },
                color: '#4B5563', // Title text color
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw} Tasks`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.1)',
                },
                ticks: {
                    font: {
                        family: 'Arial, sans-serif',
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#4B5563', // Axis color
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.1)',
                },
                ticks: {
                    font: {
                        family: 'Arial, sans-serif',
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#4B5563', // Axis color
                },
            },
        },
        hover: {
            mode: 'nearest', // Correct hover mode value
            intersect: true,
        },
        animation: {
            duration: 1000, // Animation speed
            easing: 'easeOutQuad',
        },
    };


    return (
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 max-w-full sm:max-w-md lg:max-w-lg mx-auto rounded-3xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6 relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
                    <Image
                        src={Data.avatar}
                        alt="User Profile Picture"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-between mb-6">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('tasks')}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                    Tasks
                </button>
                <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                    Activity
                </button>
            </div>

            {/* Active Tab Content */}
            {activeTab === 'profile' && (
                <div>
                    <div className="flex text-2xl sm:text-3xl items-center font-extrabold text-gray-900 dark:text-gray-100">
                        {Data.name}
                        <span className="inline-block mx-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            {Data.role}
                        </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{Data.email}</p>
                    <div className="space-y-4 my-6 text-sm sm:text-base">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 dark:border-gray-700">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                            <span className="text-gray-600 dark:text-gray-400">{Data.mobile}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 dark:border-gray-700">
                            <span className="font-medium text-gray-700 dark:text-gray-300">DOB:</span>
                            <span className="text-gray-600 dark:text-gray-400">{Data.dob ? Data.dob.toLocaleDateString() : "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 dark:border-gray-700">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Joined:</span>
                            <span className="text-gray-600 dark:text-gray-400">{Data.createdAt ? Data.createdAt.toLocaleDateString() : "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'tasks' && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-center mb-6">
                    <div className="bg-blue-500 p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                        <span className="block text-3xl font-bold text-white">{Data.tasksCompleted}</span>
                        <span className="text-sm text-gray-200">Completed</span>
                    </div>
                    <div className="bg-gray-500 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                        <span className="block text-3xl font-bold text-white">{Data.tasksPending}</span>
                        <span className="text-sm text-gray-200">Pending</span>
                    </div>
                    <div className="col-span-2 mt-6">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h3>
                    <ul className="space-y-3">
                        {Data.activity && Data.activity.map((item) => (
                            <li key={item.id} className="flex justify-between items-center p-4 border border-slate-200 dark:border-gray-600 bg-white rounded-lg shadow-md hover:bg-gray-50 dark:bg-boxdark dark:hover:bg-gray-700 transition duration-300">
                                <div className="flex-1">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item.action}</span>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6">
                <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto mb-4 sm:mb-0">
                    Edit Profile
                </button>
                <button className="px-5 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg shadow-lg border border-gray-300 hover:bg-gray-100 dark:bg-boxdark dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition duration-300 w-full sm:w-auto">
                    Settings
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
