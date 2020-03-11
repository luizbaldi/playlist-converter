import React from 'react';
import styled from 'styled-components';
import { Cutout, Button } from 'react95';

type Props = {
  platform: string;
  label: string;
  connectionHref: string;
  icon?: string | null;
};

const PlatformBox = ({
  platform,
  label,
  connectionHref,
  icon = null
}: Props) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledCutout>
        <StyledLabelRow>
          {icon && <StyledIcon src={icon} alt={`${platform} icon`} />}
          <span>{platform}</span>
        </StyledLabelRow>
        <StyledConnectButton size='sm'>
          <StyledConnectLink href={connectionHref}>Connect</StyledConnectLink>
        </StyledConnectButton>
      </StyledCutout>
    </div>
  );
};

const StyledCutout = styled(Cutout)`
  height: 150px;
  width: 200px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const StyledConnectButton = styled(Button)`
  margin-top: 12px;
`;

const StyledIcon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 6px;
  margin-bottom: 2px;
`;

const StyledLabelRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledConnectLink = styled.a`
  font-size: 0.8em;
`;

const StyledLabel = styled.span`
  font-size: 0.65em;
`;

export default PlatformBox;
