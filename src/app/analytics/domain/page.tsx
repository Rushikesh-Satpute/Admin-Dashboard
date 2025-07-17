import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CompanyData from "@/components/company/CompanyData";

export const metadata: Metadata = {
  title: "Analytics | LinksUs - Admin Dashboard",
  description:
    "This is Domainwise Analytics page for LinksUs | Admin Dashboard",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <CompanyData />
    </DefaultLayout>
  );
};

export default CalendarPage;
