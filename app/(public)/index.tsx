
import { Text } from '@/components/ui/text';
import { useTestContext } from '@/src/hooks/use-test-context';
import { View } from 'react-native';

export default function PublicHome() {
  const { isAuthenticated, setIsAuthenticated } = useTestContext();
    return (
    <View>
      <Text>Public Home (public/index.tsx)</Text>
    </View>
    );
}