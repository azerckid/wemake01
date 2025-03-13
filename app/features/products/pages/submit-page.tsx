import type { Route } from "./+types/submit-page";

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function SubmitPage() {
    return (
        <div>
            <h1>Submit Product</h1>
        </div>
    );
} 