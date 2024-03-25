import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import Animate from '@/common/Animate';

interface MenuItemProps {
    item: {
        title: string;
        icon: React.ReactNode;
        state: string;
    };
    isActive: boolean;
    onTabClick: (tabname: string) => void
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onTabClick }) => {
    const handleClick = () => {
        onTabClick(item.state);
    };

    return (
        <ListItem
            disableGutters
            disablePadding
            sx={{ py: 0.5 }}
        >
            <ListItemButton
                onClick={handleClick}
                sx={{
                    borderRadius: "10px",
                    bgcolor: isActive ? colors.green[600] : "",
                    color: isActive ? colors.common.white : "",
                    "&:hover": {
                        bgcolor: isActive ? colors.green[600] : "",
                        color: isActive ? colors.common.white : "",
                    }
                }}
            >
                <ListItemIcon sx={{
                    minWidth: "40px",
                    color: isActive ? colors.common.white : ""
                }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={
                    <Typography fontWeight={600}>
                        {item.title}
                    </Typography>
                } />
            </ListItemButton>
        </ListItem>
    );
};

interface SidebarProps {
    sidebarWidth: number;
    activeTab: string;
    onTabClick: (tabName: string) => void;
}

const Sidebar = ({ sidebarWidth, activeTab, onTabClick }: SidebarProps) => {
    const menus = [
        {
            title: "Actual Data",
            icon: <MailOutlinedIcon />,
            state: "ActualData"
        },
        {
            title: "Period Detail",
            icon: <DashboardCustomizeOutlinedIcon />,
            state: "PeriodDetail"
        },
        {
            title: "Reservation Forecast",
            icon: <NotificationsOutlinedIcon />,
            state: "ReservationForecast"
        }
    ];

    return (
        <Box
            component="nav"
            sx={{
                width: { md: sidebarWidth },
                flexShrink: { md: 0 }
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: sidebarWidth,
                        height: "98vh",
                        // borderRadius: '30px',
                        borderWidth: 0,
                        bgcolor: "transparent",
                        "::-webkit-scrollbar": {
                            display: "none"
                        }
                    }
                }}
                open
            >
                <Box
                    padding={3}
                    paddingBottom={0}
                    display="flex"
                    flexDirection="column"
                    height="100vh"
                    sx={{
                        "::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >
                    {/* logo */}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Animate type="fade" delay={1}>
                            <img src='./images/logo.png' alt="logo" height={60} />
                        </Animate>
                    </Box>
                    {/* logo */}

                    {/* <Animate sx={{ flexGrow: 1 }}> */}
                    <Animate sx={{ flexGrow: 1 }}>
                        <Paper
                            elevation={0}
                            square
                            sx={{
                                borderTopRightRadius: "10px",
                                borderTopLeftRadius: "10px",
                                p: 2,
                                height: "100%",
                                boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                            }}
                        >
                            <List>
                                {menus.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        item={item}
                                        isActive={item.state === activeTab}
                                        onTabClick={onTabClick}
                                    />
                                ))}
                            </List>
                        </Paper>
                    </Animate>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Sidebar