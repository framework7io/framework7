import React from 'react';
import Icon from '../components/icon.js';
import Badge from '../components/badge.js';

export const useIcon = (props = {}) => {
  const {
    icon,
    iconMaterial,
    iconF7,
    iconMd,
    iconIos,
    iconColor,
    iconSize,
    iconBadge,
    badgeColor,
    iconBadgeColor,
  } = props;
  if (icon || iconMaterial || iconF7 || iconMd || iconIos) {
    return (
      <Icon
        material={iconMaterial}
        f7={iconF7}
        icon={icon}
        md={iconMd}
        ios={iconIos}
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
