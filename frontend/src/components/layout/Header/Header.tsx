import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { items } from "./items";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TreeDeciduous } from "lucide-react";

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
        "sticky top-0 right-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b px-4 bg-background"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <TreeDeciduous />
          <a href="/" className="text-foreground font-semibold">
            <h1 className="text-lg font-semibold hover:text-foreground hover:cursor-default">
              TreeLink
            </h1>
          </a>
        </div>
        <Separator
          orientation="vertical"
          className="flex justify-center items-center h-4"
        />
      </div>
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {items && items.length > 0
              ? items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2 duration-75 text-sm",
                      pathname === item.url &&
                        "text-foreground hover:text-foreground font-medium hover:cursor-default",
                      pathname !== item.url &&
                        "text-popover-foreground font-normal"
                    )}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </a>
                ))
              : null}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
