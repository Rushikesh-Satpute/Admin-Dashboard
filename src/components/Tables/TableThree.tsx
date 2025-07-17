import { Package } from "@/types/package";

const packageData: Package[] = [
  {
    task: "Design Admin Panel",
    companyName: "Google",
    submissionDate: `Jan 13,2023`,
    status: "Approved",
  },
  {
    task: "Update Avatar",
    companyName: "LinksUs",
    submissionDate: `Jan 13,2023`,
    status: "Pending",
  },
  {
    task: "Deploy Landing Page",
    companyName: "Microsoft",
    submissionDate: `Jan 13,2023`,
    status: "Rejected",
  },
  {
    task: "Minor Changes in Login",
    companyName: "Twitter",
    submissionDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Tasks
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Submission Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium  text-center text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.task}
                  </h5>
                  <p className="text-md">{packageItem.companyName}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.submissionDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "Approved"
                      ? "bg-success text-success"
                      : packageItem.status === "Pending"
                        ? "bg-danger text-danger"
                        : "bg-warning text-warning"
                      }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {packageItem.status == "Pending" &&
                    <div className="flex justify-end">
                      <div
                        className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                        <button className="flex items-center group px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300 gap-x-3 hover:bg-green-600 dark:hover:bg-success hover:text-white">
                          <svg className="fill-primary dark:fill-white group-hover:fill-white" width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4,4 L9,4 C9.55228,4 10,3.55228 10,3 C10,2.44772 9.55228,2 9,2 L4,2 C2.89543,2 2,2.89543 2,4 L2,12 C2,13.1046 2.89543,14 4,14 L12,14 C13.1046,14 14,13.1046 14,12 L14,10 C14,9.44771 13.5523,9 13,9 C12.4477,9 12,9.44771 12,10 L12,12 L4,12 L4,4 Z M15.2071,2.29289 C14.8166,1.90237 14.1834,1.90237 13.7929,2.29289 L8.5,7.58579 L7.70711,6.79289 C7.31658,6.40237 6.68342,6.40237 6.29289,6.79289 C5.90237,7.18342 5.90237,7.81658 6.29289,8.20711 L7.79289,9.70711 C7.98043,9.89464 8.23478,10 8.5,10 C8.76522,10 9.01957,9.89464 9.20711,9.70711 L15.2071,3.70711 C15.5976,3.31658 15.5976,2.68342 15.2071,2.29289 Z"></path>
                          </svg>

                          <span>Accept</span>
                        </button>

                        <button className="flex group items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-danger dark:text-gray-300 gap-x-3 hover:text-white hover:bg-red-600">
                          <svg
                            className="fill-primary dark:fill-white group-hover:fill-white"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M18,18c-0.55,0-1,0.45-1,1v1H6V4h6v5c0,0.55,0.45,1,1,1h4v1c0,0.55,0.45,1,1,1s1-0.45,1-1V9c0-0.13-0.03-0.25-0.07-0.37  c-0.02-0.04-0.04-0.08-0.07-0.11c-0.03-0.05-0.05-0.11-0.09-0.16l-5-6c-0.01-0.01-0.02-0.02-0.03-0.03  c-0.07-0.07-0.15-0.13-0.23-0.18c-0.03-0.02-0.06-0.05-0.1-0.06C13.28,2.03,13.15,2,13,2H5C4.45,2,4,2.45,4,3v18c0,0.55,0.45,1,1,1  h13c0.55,0,1-0.45,1-1v-2C19,18.45,18.55,18,18,18z M14,5.76L15.86,8H14V5.76z" />
                            <path d="M8,10h2c0.55,0,1-0.45,1-1s-0.45-1-1-1H8C7.45,8,7,8.45,7,9S7.45,10,8,10z" />
                            <path d="M13,11H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,11,13,11z" />
                            <path d="M13,14H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,14,13,14z" />
                            <path d="M13,17H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,17,13,17z" />
                            <path d="M20.71,12.29c-0.39-0.39-1.02-0.39-1.41,0L18,13.59l-1.29-1.29c-0.39-0.39-1.02-0.39-1.41,0s-0.39,1.02,0,1.41L16.59,15  l-1.29,1.29c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0L18,16.41l1.29,1.29C19.49,17.9,19.74,18,20,18s0.51-0.1,0.71-0.29  c0.39-0.39,0.39-1.02,0-1.41L19.41,15l1.29-1.29C21.1,13.32,21.1,12.68,20.71,12.29z" />
                          </svg>
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  }
                  {packageItem.status == "Approved" && <div className="flex justify-end">
                    <div
                      className="flex overflow-hidden bg-white border dark:border-gray-700 divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:hover:border-warning dark:divide-warning">
                      <button className="flex group items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-opacity-20 dark:hover:border-warning group dark:hover:bg-warning  dark:text-gray-300 gap-x-3 hover:text-white hover:bg-red-600">
                        <svg
                          className="fill-primary dark:fill-white group-hover:fill-warning dark:stroke-strokedark"
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg">
                          <title>revert</title>
                          <path d="M0.032 16.416q0.128 0.576 0.544 0.992l4 4q0.608 0.608 1.44 0.608 0.8 0 1.376-0.608l4.032-3.968q0.416-0.448 0.544-1.024t-0.128-1.184q-0.224-0.544-0.736-0.896t-1.088-0.32h-1.824q0.704-3.456 3.456-5.728t6.368-2.272q2.72 0 5.024 1.344t3.616 3.648 1.344 4.992-1.344 5.024-3.616 3.648-5.024 1.344q-2.336 0-4.352-1.024t-3.424-2.752l-2.848 2.592q0 0.032-0.032 0.032t-0.064 0.064-0.064 0.032q1.984 2.368 4.768 3.712t6.016 1.344q2.816 0 5.408-1.088t4.48-3.008 2.976-4.448 1.12-5.472-1.12-5.44-2.976-4.448-4.48-2.976-5.408-1.12q-2.624 0-4.992 0.928t-4.224 2.528-3.072 3.808-1.568 4.736h-2.144q-0.608 0-1.12 0.32t-0.736 0.896-0.128 1.184zM16 16q0 0.832 0.576 1.44t1.44 0.576h4q0.8 0 1.408-0.576t0.576-1.44-0.576-1.408-1.408-0.576h-2.016v-2.016q0-0.832-0.576-1.408t-1.408-0.576-1.44 0.576-0.576 1.408v4z"></path>
                        </svg>
                        <span className="group-hover:text-warning">Revert</span>
                      </button>
                    </div>
                  </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
