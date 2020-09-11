import React from 'react';
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
    return (
      <Icon
        material={iconMaterial}
        f7={iconF7}
        icon={icon}
        md={iconMd}
        ios={iconIos}
        aurora={iconAurora}
        color={iconColor}
        size={iconSize}
      >
        {(iconBadge || iconBadge === 0) && (
          <Badge color={badgeColor || iconBadgeColor}>{iconBadge}</Badge>
        )}
      </Icon>
    );
  }
  return null;
};
