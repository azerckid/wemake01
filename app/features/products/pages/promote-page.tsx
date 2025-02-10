import type { Route } from "~/+types/products/promote";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card";

const promotionPlans = [
    {
        name: "Basic",
        price: "$49",
        description: "Perfect for small products",
        features: ["Featured for 24 hours", "Social media share", "Email newsletter mention"]
    },
    {
        name: "Pro",
        price: "$99",
        description: "Best for growing products",
        features: ["Featured for 72 hours", "Social media campaign", "Email newsletter feature", "Blog post mention"]
    }
];

export default function PromotePage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-8">Promote Your Product</h1>
            <div className="grid grid-cols-2 gap-8">
                {promotionPlans.map((plan) => (
                    <Card key={plan.name}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-4">{plan.price}</div>
                            <ul className="space-y-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="text-sm text-muted-foreground">
                                        • {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Choose {plan.name}</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Promote | Products | wemake" },
        { name: "description", content: "Promote your product to reach more users" }
    ];
}; 