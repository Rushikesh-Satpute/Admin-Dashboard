import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFour from "@/components/Tables/TableFour";

export const metadata: Metadata = {
    title: "Users | LinksUs - Admin Dashboard",
    description:
        "This is User page for LinksUs - Tailwind CSS Admin Dashboard",
};

const users = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            <TableFour />
        </DefaultLayout>
    );
};

export default users;
