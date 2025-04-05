import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export function loader({ request }: Route.LoaderArgs) {
    // TODO: Replace with actual user ID from authentication
    // For now, redirecting to a hardcoded user
    return redirect("/users/mr.344e5eb9");
}

// Need to export a component even if we're just redirecting
export function Component() {
    return null;
}