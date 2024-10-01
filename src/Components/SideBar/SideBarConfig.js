import {
  DashboardCustomizeOutlined,
  PersonOutlineOutlinedIcon,
  PersonAddAlt1Icon,
  PersonRemoveIcon,
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
    // children: [
    //   {
    //     title: "Remove Speakers",
    //     path: "allspeakerspage",
    //     icon: <PersonRemoveIcon />,
    //   },
    //   {
    //     title: "Add Speaker",
    //     path: "add-speakers",
    //     icon: <PersonAddAlt1Icon />,
    //   },
    // ],
  },
  {
    title: "Events",
    path: "events",
    icon: <CalendarMonthOutlinedIcon />,
  },
];
