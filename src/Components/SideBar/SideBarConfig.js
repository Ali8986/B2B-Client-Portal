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
    path: "Dashboard",

    icon: <DashboardCustomizeOutlined />,
  },
  {
    title: "Exhibitors",
    path: "Exhibitors",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    title: "Speakers",
    path: "Speaker",
    icon: <InterpreterModeOutlinedIcon />,
    children: [
      {
        title: "Remove Speakers",
        path: "allspeakerspage",
        icon: <PersonRemoveIcon />,
      },
      {
        title: "Add Speaker",
        path: "add-speakers",
        icon: <PersonAddAlt1Icon />,
      },
    ],
  },
  {
    title: "Events",
    path: "Events",
    icon: <CalendarMonthOutlinedIcon />,
  },
];
