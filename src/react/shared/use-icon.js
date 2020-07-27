import React from 'react';
import Icon from '../components/icon';

export const useIcon = (props = {}) => {
  const { icon, iconMaterial, iconF7, iconMd, iconIos, iconAurora, iconColor, iconSize } = props;
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
      />
    );
  }
  return null;
};
