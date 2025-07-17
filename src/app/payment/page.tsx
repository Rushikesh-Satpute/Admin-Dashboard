import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import CompanyData from "@/components/company/CompanyData";
import PaymentHistory from "@/components/Payment/PaymentHistory";

export const metadata: Metadata = {
    title: "Payment History | LinksUs - Admin Dashboard",
    description:
        "This is Payment History for LinksUs - Admin Dashboard",
};

const PaymentHistoryPage: React.FC = () => {
    return (
        <DefaultLayout>
            <PaymentHistory />
        </DefaultLayout>
    );
};

export default PaymentHistoryPage;
