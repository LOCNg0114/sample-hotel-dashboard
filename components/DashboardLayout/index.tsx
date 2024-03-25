import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ActualDataTab from "../ActualDataTab";
import ReservationForecastTab from "../ReservationForecastTab";
import PeriodDetailTab from "../PeriodDetailTab";
import Animate from "@/common/Animate";

const sidebarWidth = 350;

const DashboardLayout = () => {
    const [activeTab, setActiveTab] = useState<string>("ActualData");

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "ActualData":
                return <ActualDataTab />;
            case "PeriodDetail":
                return <PeriodDetailTab />;
            case "ReservationForecast":
                return <ReservationForecastTab />;
            default:
                return null;
        }
    };

    return (
        <Box display="flex">
            <Sidebar
                sidebarWidth={sidebarWidth}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    height: "100vh",
                    width: { sm: `calc(100% - ${sidebarWidth}px)` },
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                    }}
                >
                    <Animate type="fade" delay={1}>
                        {renderTabContent()}
                    </Animate>
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;


// import React, { useState } from "react";
// import styles from "./DashboardLayout.module.scss";
// import Sidebar from "@/components/Sidebar";
// import ActualDataTab from "../ActualDataTab";
// import ReservationForecastTab from "../ReservationForecastTab";
// import PeriodDetailTab from "../PeriodDetailTab";
// const sidebarWidth = 350;

// const DashboardLayout = () => {
//     const [activeTab, setActiveTab] = useState("ActualData");

//     const handleTabClick = (tabName: string) => {
//         setActiveTab(tabName);
//     };

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case "ActualData":
//                 return <ActualDataTab />;
//             case "PeriodDetail":
//                 return <PeriodDetailTab />;
//             case "ReservationForecast":
//                 return <ReservationForecastTab />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className={styles.dashboardLayout}>
//             <div className={styles.sidebar}>
//                 <Sidebar
//                     sidebarWidth={sidebarWidth}
//                     activeTab={activeTab}
//                     onTabClick={handleTabClick}
//                 />
//             </div>
//             <div className={styles.mainContent}>
//                 <div className={styles.contentWrapper}>
//                     {renderTabContent()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;