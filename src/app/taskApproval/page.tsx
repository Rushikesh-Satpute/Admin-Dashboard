import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Task Approval | LinksUs - Admin Dashboard",
  description:
    "This is TaskApproval page for LinksUs - Next.js Tailwind CSS Admin Dashboard",
};

const TaskApprovalPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Approvals" />
        <TableThree />
    </DefaultLayout>
  );
};

export default TaskApprovalPage;
