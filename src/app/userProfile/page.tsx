import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import CompanyData from "@/components/company/CompanyData";
import PaymentHistory from "@/components/Payment/PaymentHistory";
import UserProfile from "@/components/Users/UserProfile";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
    title: "User Profile | LinksUs - Admin Dashboard",
    description:
        "This is User Profile Page for LinksUs - Admin Dashboard",
};

const UserProfilePage: React.FC = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="User Profile" />
            <UserProfile />
        </DefaultLayout>
    );
};

export default UserProfilePage;
