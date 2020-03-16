import React from "react";
import styled from "styled-components";
import { Cutout } from "react95";

type Props = {
  platform: string;
  label: string;
  icon?: string | null;
  children: React.ReactNode;
};

const PlatformBox = ({ platform, label, icon = null, children }: Props) => (
  <div>
    <StyledLabel>{label}</StyledLabel>
    <StyledCutout>
      <StyledLabelRow>
        {icon && <StyledIcon src={icon} alt={`${platform} icon`} />}
        <span>{platform}</span>
      </StyledLabelRow>
      {children}
    </StyledCutout>
  </div>
);

const StyledCutout = styled(Cutout)`
  height: 200px;
  width: 250px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const StyledIcon = styled.img`
  height: 28px;
  width: 28px;
  margin-right: 6px;
  margin-bottom: 2px;
`;

const StyledLabelRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledLabel = styled.span`
  font-size: 0.65em;
`;

export default PlatformBox;
