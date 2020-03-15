import React, { useState } from 'react';
import { List, ListItem, Button } from 'react95';
import styled from 'styled-components';

type DropdownItem = {
  label: string;
  onClick: () => void;
};

type Props = {
  items: DropdownItem[];
};

const SelectDropdown = ({ items }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledContainer>
      <Button onClick={toggle} active={open} size='sm'>
        <span>Select Playlist</span>
      </Button>
      {open && (
        <StyledList
          horizontalAlign='right'
          verticalAlign='bottom'
          onClick={handleClose}
        >
          {items.map((item, i) => (
            <ListItem key={i} onClick={item.onClick} size='lg'>
              {item.label}
            </ListItem>
          ))}
        </StyledList>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledList = styled(List)`
  z-index: 1;
  max-height: 40vh;
  overflow-y: scroll;
`;

export default SelectDropdown;
