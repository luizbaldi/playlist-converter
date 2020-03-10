import React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  connectionHref: string;
};

const PlatformBox = ({ label, connectionHref }: Props) => {
  return (
    <StyledContainer>
      <span>{label}</span>
      <StyledConnectButton href={connectionHref}>Connect</StyledConnectButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 150px;
  width: 200px;
  background-color: papayawhip;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 4px;
`;

const StyledConnectButton = styled.a`
  margin-top: 16px;
  padding: 6px 0;
`;

export default PlatformBox;
