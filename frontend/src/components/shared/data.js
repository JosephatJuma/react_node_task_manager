import {
  IconDashboard,
  IconListCheck,
  IconAlertCircle,
  IconSettings,
  IconPlus,
  IconListDetails,
  IconUsersGroup,
  IconUserCircle,
} from "@tabler/icons-react";
export const data = [
  { link: "/", label: "Home", icon: IconDashboard },
  { link: "/tasks/add", label: "Add Task", icon: IconPlus },
  { link: "/tasks/completed", label: "Completed Tasks", icon: IconListCheck },
  { link: "/tasks/upcoming", label: "Upcomming Tasks", icon: IconListDetails },
  { link: "/teams", label: "My Teams", icon: IconUsersGroup },
  { link: "/invitations", label: "Invitations", icon: IconAlertCircle },
  { link: "/settings", label: "Settings", icon: IconSettings },
  { link: "/profile", label: "Profile", icon: IconUserCircle },
];
