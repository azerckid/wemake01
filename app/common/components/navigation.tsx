import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "see the top performers in your community",
                to: "/products/leaderboards",
            },
            {
                name: "Categories",
                description: "browse products by category",
                to: "/products/categories",
            },
            {
                name: "Search",
                description: "search for products and makers",
                to: "/products/search",
            },
            {
                name: "Submit",
                description: "share your product with the community",
                to: "/products/submit",
            },
            {
                name: "Promote",
                description: "promote your product to reach more users",
                to: "/products/promote",
            },
        ]
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                name: "Remote",
                description: "find remote-friendly positions",
                to: "/jobs?location=remote",
            },
            {
                name: "Full Time",
                description: "find full-time positions and careers",
                to: "/jobs?type=full-time",
            },
            {
                name: "Freelance",
                description: "find freelance and contract opportunities",
                to: "/jobs?type=freelance",
            },
            {
                name: "Internships",
                description: "find internship opportunities",
                to: "/jobs?type=internship",
            },
            {
                name: "Submit",
                description: "post a job listing",
                to: "/jobs/submit",
            },
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                name: "Posts",
                description: "browse all community posts",
                to: "/community",
            },
            {
                name: "Top Posts",
                description: "see the most popular community posts",
                to: "/community?sort=top",
            },
            {
                name: "New Posts",
                description: "see the latest community posts",
                to: "/community?sort=new",
            },
            {
                name: "Create Post",
                description: "share something with the community",
                to: "/community/create",
            },
        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideasgpt",
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                name: "All Teams",
                description: "browse all teams",
                to: "/teams",
            },
            {
                name: "Create Team",
                description: "start a new team",
                to: "/teams/create",
            },
            {
                name: "My Teams",
                description: "view your teams",
                to: "/teams/my",
            }
        ]
    }
]

export default function Navigation() {
    return (
        <nav className="flex flex-row px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-slate-500" >
            <div className="flex items-center gap-2">
                <Link to="/" className="font-bold tracking-tighter text-lg"> wemake</Link>
                <Separator orientation="vertical" className="h-6 mx-4"></Separator>
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name} >
                                {menu.items ?
                                    <>
                                        <Link to={menu.to}>
                                            <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                        </Link>
                                        <NavigationMenuContent >
                                            <ul className="grid grid-cols-2 font-light gap-2 p-6 md:w-[500px] lg:w-[500px]">
                                                {menu.items &&
                                                    menu.items.map((item) => (
                                                        <li
                                                            key={item.name}
                                                            className={cn([
                                                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                                                item.to === "/products/promote" && "col-span-2 bg-accent hover:bg-primary/20 focus:bg-primary/20 ",
                                                                item.to === "/jobs/submit" && "col-span-2 bg-accent hover:bg-primary/20 focus:bg-primary/20"
                                                            ])}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    className="p-2 space-x-1 block leading-none no-underline outline-none "
                                                                    to={item.to}>
                                                                    <span className="text-sm font-medium leading-none">{item.name}</span>
                                                                    <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </NavigationMenuContent>
                                    </> : <Link className={navigationMenuTriggerStyle()} to={menu.to}>{menu.name}</Link>}

                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav >)
}
