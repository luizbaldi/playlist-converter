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

const Menu = ({ items }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledContainer>
      <Button onClick={toggle} active={open}>
        <span>Select Playlist</span>
      </Button>
      {open && (
        <List
          horizontalAlign='right'
          verticalAlign='bottom'
          onClick={handleClose}
          style={{ zIndex: 1 }}
        >
          {items.map((item, i) => (
            <ListItem key={i} onClick={item.onClick} size='lg'>
              {item.label}
            </ListItem>
          ))}
        </List>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export default Menu;
