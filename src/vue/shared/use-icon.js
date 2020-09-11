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
    return {
      props: {
        material: iconMaterial,
        f7: iconF7,
        icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize,
      },
      badge:
        iconBadge || iconBadge === 0
          ? { props: { color: badgeColor || iconBadgeColor }, content: iconBadge }
          : null,
    };
  }
  return null;
};
