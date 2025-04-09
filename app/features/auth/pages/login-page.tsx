import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import { Form, Link, useNavigation, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Login | wemake" }];
};

const formSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email({ message: "Invalid email address" }),

    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password is required"
    }).min(8, { message: "Password must be at least 8 characters long" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));

    if (!success) {
        return {
            formError: error.flatten().fieldErrors,
            loginError: null
        };
    }

    const { email, password } = data;
    const { client, headers } = makeSSRClient(request);
    const { error: loginError } = await client.auth.signInWithPassword({ email, password });

    if (loginError) {
        return {
            loginError: loginError.message,
            formError: null
        };
    }

    return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex flex-col relative items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
                <Link to="/auth/join">Join</Link>
            </Button>

            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">Log in to your account</h1>

                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        id="email"
                        required
                        type="email"
                        placeholder="i.e wemake@example.com"
                    />

                    {actionData && "formError" in actionData && (
                        <p className="text-sm text-red-500">{actionData?.formError?.email?.join(", ")}</p>
                    )}

                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="i.e wemake@example.com"
                    />

                    {actionData && "formError" in actionData && (
                        <p className="text-sm text-red-500">{actionData?.formError?.password?.join(", ")}</p>
                    )}

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "Log in"
                        )}
                    </Button>

                    {actionData?.loginError && (
                        <p className="text-sm text-red-500">{actionData.loginError}</p>
                    )}
                </Form>

                <AuthButtons />
            </div>
        </div>
    );
}