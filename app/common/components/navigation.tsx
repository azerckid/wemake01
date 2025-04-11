import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "./ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { BellIcon, CreditCardIcon, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon, LayoutDashboardIcon } from "lucide-react";

const menus = [
    {
        name: "Products",
        to: "/products/leaderboards",
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
        to: "/ideas",
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

export default function Navigation(
    { isLoggedIn,
        username,
        avatar,
        name,
        hasNotifications,
        hasMessages
    }: {
        isLoggedIn: boolean,
        username?: string,
        avatar?: string | null,
        name?: string,
        hasNotifications: boolean,
        hasMessages: boolean
    }) {

    return (
        <nav className="flex flex-row px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background" >
            <div className="flex items-center gap-2">
                <Link to="/" className="font-bold tracking-tighter text-lg"> wemake</Link>
                <Separator orientation="vertical" className="h-6 mx-4"></Separator>
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name} >
                                {menu.items ? (
                                    <>
                                        <Link to={menu.to} prefetch="viewport" className={navigationMenuTriggerStyle()}>
                                            <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                        </Link>
                                        <NavigationMenuContent >
                                            <ul className="grid grid-cols-2 font-light gap-2 p-6 md:w-[500px] lg:w-[500px] bg-background">
                                                {menu.items.map((item) => (
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
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <Link className={navigationMenuTriggerStyle()} to={menu.to}>{menu.name}</Link>
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            {
                isLoggedIn
                    ?
                    <div className="flex items-center flex-row gap-2">
                        <Button size="icon" variant="ghost" asChild className="relative hover:bg-transparent">
                            <Link to="/my/notifications">
                                <BellIcon className="size-4" />
                                {hasNotifications && <div className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></div>}
                            </Link>
                        </Button>
                        <Button size="icon" variant="ghost" asChild className="relative hover:bg-transparent">
                            <Link to="/my/messages">
                                <MessageCircleIcon className="size-4" />
                                {hasMessages && <div className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></div>}
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    {avatar ? (
                                        <AvatarImage src={avatar} />
                                    ) : (
                                        <AvatarFallback>{name?.[0]}</AvatarFallback>
                                    )}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64">
                                <DropdownMenuLabel className="flex flex-row gap-2">
                                    <Avatar>
                                        {avatar ? (
                                            <AvatarImage src={avatar} />
                                        ) : (
                                            <AvatarFallback>{name?.[0]}</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            @{username}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild className="flex flex-row gap-2 cursor-pointer">
                                        <Link to="/my/dashboard">
                                            <LayoutDashboardIcon className="size-4 mr-2" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="flex flex-row gap-2 cursor-pointer">
                                        <Link to="/my/profile">
                                            <UserIcon className="size-4 mr-2" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="flex flex-row gap-2 cursor-pointer">
                                        <Link to="/my/settings">
                                            <SettingsIcon className="size-4 mr-2" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="flex flex-row gap-2 cursor-pointer">
                                        <Link to="/billing">
                                            <CreditCardIcon className="size-4 mr-2" />
                                            <span>Billing</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild className="flex flex-row gap-2 cursor-pointer">
                                        <Link to="/auth/logout">
                                            <LogOutIcon className="size-4 mr-2" />
                                            <span>Logout</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    : (
                        <div className="flex flex-row gap-2">
                            <Button asChild variant="secondary">
                                <Link to="/auth/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/auth/join">Join</Link>
                            </Button>
                        </div>
                    )
            }
        </nav >)
}