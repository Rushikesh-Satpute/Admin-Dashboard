import React from "react";

type Payment = {
    date: string;
    amount: number;
};

type Company = {
    name: string;
    contact: string;
    subscription: string;
    totalTokens: number;
    usedTokens: number;
    tasksListed: number;
    recentPayments: Payment[];
};

type ModalProps = {
    company: Company | null;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ company, onClose }) => {
    if (!company) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        {company.name} - Detailed Overview
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500"
                    >
                        ✖
                    </button>
                </div>

                <div className="mt-4 space-y-6">
                    {/* Company Summary */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Company Summary
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Contact:</strong> {company.contact}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Subscription Plan:</strong> {company.subscription}
                        </p>
                    </div>

                    {/* Tokens Overview */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Token Overview
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Total Tokens:</strong> {company.totalTokens}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Used Tokens:</strong> {company.usedTokens}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Remaining Tokens:</strong>{" "}
                            {company.totalTokens - company.usedTokens}
                        </p>
                    </div>

                    {/* Payment History */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Recent Payment History
                        </h3>
                        {company.recentPayments.length > 0 ? (
                            <ul className="space-y-1">
                                {company.recentPayments.map((payment, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        <strong>Date:</strong> {payment.date} |{" "}
                                        <strong>Amount:</strong> ${payment.amount}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                No payment history available.
                            </p>
                        )}
                    </div>

                    {/* Token Growth Visualization (Static Example)
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Token Usage Growth
                        </h3>
                        <div className="h-32 w-full rounded-md bg-gray-100 dark:bg-strokedark">
                            <p className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                                Graph Placeholder (Integrate charts here)
                            </p>
                        </div>
                    </div>
                    */}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
