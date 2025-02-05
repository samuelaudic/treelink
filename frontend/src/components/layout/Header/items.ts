import { Home, TreePineIcon, Users } from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  submenu?: {
    title: string;
    url: string;
    description: string;
  }[];
};

export const items: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Tree",
    url: "/tree",
    icon: TreePineIcon,
  },
];
