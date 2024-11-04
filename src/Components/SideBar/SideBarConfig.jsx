import {
  SupportIcon,
  DashboardIcon,
  ExhibitorIcon,
  SpeakerIcon,
  EventIcon,
  CompanyIcon,
  ManagerIcon,
} from "../GeneralComponents/SideBarIcons";

export const options = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Exhibitors",
    path: "exhibitors",
    icon:  ExhibitorIcon,
  },
  {
    title: "Speakers",
    path: "speakers",
    icon: SpeakerIcon,
  },
  {
    title: "Events",
    path: "events",
    icon: EventIcon,
  },
  {
    title: "Company",
    path: "company",
    icon: CompanyIcon,
  },
  {
    title: "Manage Website",
    icon:  ManagerIcon,
    children: [
      {
        title: "Template Configuration",
        path: "template-configuration",
        icon: ManagerIcon,
      },
      {
        title: "Module Configuration",
        path: "module-configuration",
        icon: ManagerIcon,
      },
      {
        title: "Website Pages",
        path: "website-pages",
        icon: ManagerIcon,
      },
    ],
  },
  {
    title: "Get Support",
    icon: SupportIcon,
    children: [
      {
        title: "Departments",
        path: "departments",
        icon: SupportIcon,
      },
      {
        title: "AutoResponder Message",
        path: "autoresponder-message",
        icon: SupportIcon,
      },
    ],
  },
];
