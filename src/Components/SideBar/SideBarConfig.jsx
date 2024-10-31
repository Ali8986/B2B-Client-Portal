import {
  DashboardCustomizeOutlined,
  PersonOutlineOutlinedIcon,
  InterpreterModeOutlinedIcon,
  CalendarMonthOutlinedIcon,
  BusinessIcon,
  CalendarMonthIcon,
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
  {
    title: "Company",
    path: "company",
    icon: <BusinessIcon />,
  },
  {
    title: "Manage Website",
    icon: <CalendarMonthIcon />,
    children: [
      {
        title: "Template Configuration",
        path: "template-configuration",
        icon: <CalendarMonthIcon />,
      },
      {
        title: "Module Configuration",
        path: "module-configuration",
        icon: <CalendarMonthIcon />,
      },
      {
        title: "Website Pages",
        path: "website-pages",
        icon: <CalendarMonthIcon />,
      },
    ],
  },
];
