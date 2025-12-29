import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

export default function PublicHome() {
    return (
        <>
            <Box className="flex-1">
            <Card size="sm" variant="outline" className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center">
                {/* <Link href="/(public)/[id]"> */}
                    <Image
                        source={{ uri: "https://picsum.photos/seed/pattern300/300/200" }}
                        className="shadow rounded-lg overflow-hidden border"
                        alt="image"
                    />
                    <Text className="bg-red-500">
                        Bildbeschreibung
                    </Text>
                    <Heading size="sm" className="bg-green-500">
                        Bildtitel
                    </Heading>
                {/* </Link> */}
            </Card>
            </Box>
       </>
    );
}