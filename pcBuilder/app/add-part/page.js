export default function AddPartPage(){
    return(
        <main>
            <h1>Add Component</h1>
            <form action="/api/parts" method="POST">
                <input
                    name="partName"
                    placeholder="Component Name"
                    required
                />
                <input
                    name="partCategory"
                    placeholder="Category"
                    required
                />
                <input
                    name="partPrice"
                    placeholder="Price"
                    required
                />
                <textarea
                    name="partSpecs"
                    placeholder="Specs and details"
                    required
                ></textarea>

                <button type="submit">Submit to Database</button>
            </form>
        </main>
    )
}