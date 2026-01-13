import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

export default function PatternListCard() {
  return (
    <Card className="">
      <Image
        source={{
          uri: 'https://gluestack.github.io/public-blog-video-assets/yoga.png',
        }}
        className=""
        alt="image"
      />
      <Text className=">
        May 15, 2023
      </Text>
      <Heading size="md" className="mb-4">
        The Power of Positive Thinking
      </Heading>
    </Card>
  );
}
