import { Outlet } from "react-router";
import type { Route } from "./+types/auth-layout";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Authentication" },
        { name: "description", content: "Authentication pages" },
    ];
};

export default function AuthLayout() {
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="bg-gradient-to-br from-primary via-black to-primary/50" />
            <Outlet />
        </div>
    );
} 