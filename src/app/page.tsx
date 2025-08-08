import { Header } from "@/components/common/header";

export default function HomePage() {
    return (
        <main>
            <Header />
            <section className="mx-auto max-w-7xl p-4">
                <h2 className="mb-2 text-xl font-semibold">Frontend inicial</h2>
                <p className="text-sm text-muted-foreground">
                    Base de Next.js + shadcn/ui lista. Sigamos con Destinations.
                </p>
            </section>
        </main>
    );
}
