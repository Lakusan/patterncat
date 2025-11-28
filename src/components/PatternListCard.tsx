import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

export default function PatternListCard() {
  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3">
      <Image
        source={{
          uri: 'https://gluestack.github.io/public-blog-video-assets/yoga.png',
        }}
        className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
        alt="image"
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        May 15, 2023
      </Text>
      <Heading size="md" className="mb-4">
        The Power of Positive Thinking
      </Heading>
    </Card>
  );
}
