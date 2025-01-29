import { Button } from "~/common/components/ui/button";

export default function HomePage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">
                welcom to our App
            </h1>
            <p className="text-lg mb-8">get started by exploring our features or sign in to your account</p>
            <div className="flex gap-4">
                <Button variant="default">get start</Button>
                <Button variant="outline">learn more</Button>
            </div>
        </main >
    )
}