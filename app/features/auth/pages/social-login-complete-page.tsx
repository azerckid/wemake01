import type { Route } from "./+types/social-login-complete-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Complete Social Login" },
        { name: "description", content: "Complete social login process" },
    ];
};

export default function SocialLoginCompletePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Complete Social Login</h1>
        </div>
    );
} 