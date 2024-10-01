import {
  DashboardCustomizeOutlined,
  PersonOutlineOutlinedIcon,
  InterpreterModeOutlinedIcon,
  CalendarMonthOutlinedIcon,
} from "../GeneralComponents/SideBarIcons";

export const options = [
  {
    title: "Dashboard",
    path: "dashboard",

    icon: <DashboardCustomizeOutlined />,
  },
  {
    title: "Exhibitors",
    path: "exhibitors",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    title: "Speakers",
    path: "speakers",
    icon: <InterpreterModeOutlinedIcon />,
  },
  {
    title: "Events",
    path: "events",
    icon: <CalendarMonthOutlinedIcon />,
  },
];
