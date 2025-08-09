export default function HomePage() {
    return (
        <main>
            <section className="mx-auto max-w-7xl p-4 space-y-4">
                <h2 className="mb-2 text-2xl font-bold">HotelBediaX</h2>

                <p className="text-sm text-muted-foreground">
                    HotelBediaX, a new client of FDSA and one of the most important fictional companies in the
                    hotel sector, has the need to completely renew its tourist destination management portal.
                </p>

                <p className="text-sm text-muted-foreground">
                    The objective of this test is that you, a full stack developer, create a web application for
                    HotelBediaX that operates on destinations. The final application will consist of several
                    modules, the first of which will be the <strong>Destinations</strong> module, which is the one you are
                    going to develop.
                </p>

                <p className="text-sm text-muted-foreground">
                    This app will allow navigation between the different modules, although at the moment there
                    is only this one.
                </p>

                <h3 className="mt-4 text-lg font-semibold">Minimum required operations</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Create a new destination</li>
                    <li>Read all created destinations and their data</li>
                    <li>Update their data</li>
                    <li>Delete them</li>
                    <li>Filter the data</li>
                </ul>

                <p className="text-sm text-muted-foreground">
                    Those are the minimum required operations, but you are free to add others if you feel that they are useful.
                </p>

                <p className="text-sm text-muted-foreground">
                    Users have created a first sketch of how the screen should be, but you have creative
                    freedom to add any improvement in both usability and look and feel. Every change to the
                    design that you propose will be valued, as long as the minimum needs are covered.
                </p>

                <h3 className="mt-4 text-lg font-semibold">Requirements</h3>

                <h4 className="font-medium mt-2">Front-end</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>SPA (Single Page Application)</li>
                    <li>React / Angular / AngularJS, whichever you prefer</li>
                    <li>It must handle a high amount of destinations (more than 200,000 records)</li>
                </ul>

                <h4 className="font-medium mt-2">Back-end</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>REST API</li>
                    <li>NodeJS / .NET / Java / PHP</li>
                    <li>You can mock the database</li>
                </ul>

                <h4 className="font-medium mt-2">Navigation</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Menu listing the distinct modules</li>
                </ul>

                <h4 className="font-medium mt-2">CRUD</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>4 basic operations (create, read, update, delete)</li>
                </ul>

                <h4 className="font-medium mt-2">Executable</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Standalone demo web app</li>
                </ul>
            </section>
        </main>
    );
}
