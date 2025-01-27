import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { items } from "../AppSidebar/AppSidebar";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname?.split("/").filter(Boolean) || [];

  const isRoot = pathname === "/";
  const homeItem = items.find((item) => item.url === "/");

  const getBreadcrumbTitleAndIcon = (segment: string, index: number) => {
    if (!isNaN(Number(segment))) {
      return { title: segment, icon: undefined };
    }

    const currentUrl = `/${segments.slice(0, index + 1).join("/")}`;

    const segmentTranslations: Record<string, string> = {
      home: homeItem?.title || "Home",
      members: "Members",
      tree: "Tree",
    };

    const flatMenu = items.flatMap((item) => [
      { title: item.title, url: item.url, icon: item.icon },
      ...(item.submenu?.map((sub) => ({
        title: sub.title,
        url: sub.url,
      })) || []),
    ]);

    const match = flatMenu.find((item) => item.url === currentUrl);
    if (match) {
      return {
        title: match.title,
        icon: "icon" in match ? match.icon : undefined,
      };
    }

    return {
      title:
        segmentTranslations[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: undefined,
    };
  };

  return (
    <header
      className={cn(
        "sticky top-0 right-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background",
        "transition-[margin] duration-200 ease-linear"
      )}
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            {isRoot && homeItem && (
              <BreadcrumbItem>
                <a
                  href="/"
                  className={cn(
                    "flex items-center gap-2",
                    isRoot && "text-foreground font-medium"
                  )}
                  aria-current={isRoot ? "page" : undefined}
                >
                  {homeItem.icon && <homeItem.icon className="h-4 w-4" />}
                  <span>{homeItem.title}</span>
                </a>
              </BreadcrumbItem>
            )}

            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join("/")}`;
              const isLast = index === segments.length - 1;
              const { title, icon: Icon } = getBreadcrumbTitleAndIcon(
                segment,
                index
              );

              return (
                <Fragment key={segment}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {title}
                      </BreadcrumbPage>
                    ) : (
                      <a
                        href={href}
                        className="flex items-center gap-2"
                        aria-current={false}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {title}
                      </a>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
