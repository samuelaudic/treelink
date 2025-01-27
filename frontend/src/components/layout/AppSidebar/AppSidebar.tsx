import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ChevronRight, Home, TreePineIcon, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type MenuItem = {
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

export function AppSidebar() {
  const isLinkActive = (itemUrl: string) => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    return currentPath === itemUrl;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <p>TreeLink</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = isLinkActive(item.url);

              if (item.submenu) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={true}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={cn(
                            isActive &&
                              "bg-accent text-accent-foreground font-semibold"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-foreground">{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isLinkActive(subItem.url)}
                              >
                                <a
                                  href={subItem.url}
                                  className={cn(
                                    isLinkActive(subItem.url) && "font-semibold"
                                  )}
                                >
                                  {subItem.title}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      isActive &&
                        "bg-accent text-accent-foreground font-semibold"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
