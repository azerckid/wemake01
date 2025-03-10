import type { Route } from "./+types/social-login-start-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Social Login" },
        { name: "description", content: "Start social login process" },
    ];
};

export default function SocialLoginStartPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Start Social Login</h1>
        </div>
    );
} 