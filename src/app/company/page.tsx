import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import CompanyData from "@/components/company/CompanyData";
import TableTwo from "@/components/Tables/TableTwo";

export const metadata: Metadata = {
    title: "Company Data | LinksUs - Admin Dashboard",
    description:
        "This is Company Analytics for LinksUs - Admin Dashboard",
};

const Company: React.FC = () => {
    return (
        <DefaultLayout>
            <TableTwo />
        </DefaultLayout>
    );
};

export default Company;
