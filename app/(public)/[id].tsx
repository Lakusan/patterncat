import PatternDetails from "@/src/components/screens/PatternDetails"

export default function PublicPatternDetails() {
    return (
        <PatternDetails item={{
            id: "id",
            ownerId: "IwnerID",
            title: "Titel",
            description: "Beschreibung",
            image: "Bildstring",
            gallery: [],
            category: "kategorie",
            updatedAt: 1
        }} />
    )
}       