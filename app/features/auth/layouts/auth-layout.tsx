import { Outlet } from "react-router";
import type { Route } from "./+types/auth-layout";
import { FlickeringGrid } from "components/magicui/flickering-grid";
// import { motion } from "framer-motion";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Authentication" },
        { name: "description", content: "Authentication pages" },
    ];
};

export default function AuthLayout() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="hidden lg:block  via-black to-primary/50">
                <FlickeringGrid
                    squareSize={4}
                    gridGap={5}
                    maxOpacity={0.5}
                    flickerChance={0.2}
                    color="#E11D49"
                />
            </div>
            <Outlet />
        </div>
    );
} 