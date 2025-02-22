import React from 'react';
import './TooltipIcon.scss';
import { OverlayTrigger, Tooltip, Overlay } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import classNames from 'classnames';
import { CSSProperties } from 'styled-components';

interface TooltipIconProps extends Partial<React.ComponentPropsWithRef<typeof Overlay>> {
  toolTip?: string;
  toolTipId: string;
  className?: string;
  /** Prop to control the size of the tooltip icon */
  iconSize?: number;
  /** Prop used to pass CSS properties to the tooltip icon */
  style?: CSSProperties;
  /** Prop used to control the placement of the tooltip text on hover */
  placement?: 'top' | 'bottom' | 'right' | 'left';
}

const TooltipIcon = (props: TooltipIconProps) => (
  <OverlayTrigger
    placement={props.placement}
    overlay={
      <Tooltip placement={props.placement} id={props.toolTipId}>
        {props.toolTip}
      </Tooltip>
    }
  >
    <FaInfoCircle
      style={props.style}
      size={props.iconSize}
      className={classNames('tooltip-icon', props.className)}
    />
  </OverlayTrigger>
);

export default TooltipIcon;
