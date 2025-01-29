import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

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
                            <NavigationMenuItem key={menu.name}>
                                <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                {menu.items && (
                                    <NavigationMenuContent>
                                        {menu.items.map((item) => (
                                            <NavigationMenuLink asChild key={item.name} className="flex flex-col gap-2 hover:bg-transparent">
                                                <Link to={item.to}>{item.name}</Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav >)
}
