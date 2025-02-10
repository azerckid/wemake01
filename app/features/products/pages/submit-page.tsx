import type { Route } from "~/+types/products/submit";
// import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
// import { Textarea } from "~/common/components/ui/textarea";

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-8">Submit Your Product</h1>
            <div className="max-w-2xl space-y-6">
                {/* <div className="space-y-2">
                    <label className="text-sm font-medium">Product Name</label>
                    <Input placeholder="Enter your product name" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Describe your product..." />
                </div> */}
                <Button>Submit Product</Button>
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit | Products | wemake" },
        { name: "description", content: "Share your product with the community" }
    ];
}; 