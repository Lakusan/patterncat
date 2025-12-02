import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { GlobeIcon } from '@/components/ui/icon';

export default function Chip() {
  return (
    <Badge size="lg" variant="solid" action="muted">
      <BadgeText>Verified</BadgeText>
      <BadgeIcon as={GlobeIcon} className="ml-2" />
    </Badge>
  );
}
