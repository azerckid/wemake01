import type { Route } from "./+types/otp-start-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start OTP" },
        { name: "description", content: "Start OTP verification" },
    ];
};

export default function OtpStartPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Start OTP Verification</h1>
        </div>
    );
} 