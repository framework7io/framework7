import { h } from 'vue';
import Icon from '../components/icon';
import Badge from '../components/badge';

export const useIcon = (props = {}) => {
  const {
    icon,
    iconMaterial,
    iconF7,
    iconMd,
    iconIos,
    iconAurora,
    iconColor,
    iconSize,
    iconBadge,
    badgeColor,
    iconBadgeColor,
  } = props;
  if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
    return h(
      Icon,
      {
        material: iconMaterial,
        f7: iconF7,
        icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize,
      },
      [iconBadge && h(Badge, { color: badgeColor || iconBadgeColor }, [iconBadge])],
    );
  }
  return null;
};
