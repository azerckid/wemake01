import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Complete OTP" },
        { name: "description", content: "Complete OTP verification" },
    ];
};

export default function OtpCompletePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Complete OTP Verification</h1>
        </div>
    );
} 