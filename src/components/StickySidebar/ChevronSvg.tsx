import * as React from 'react';

export const AnimatedChevronButton = ({ open }: { open: boolean }) => {
  const triggerOn = <div className="nav-trigger-on" />;
  const triggerOff = <div className="nav-trigger-off" />;
  const icon = open ? triggerOn : triggerOff;

  return icon;
};
