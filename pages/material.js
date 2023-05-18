import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer(props) {

  console.log("TemporaryDrawer Props", props);
  const anchor = "bottom";
  let items;

  if (props && props.recentSearches) {
    items = props.recentSearches.map((item) => {
      return {
        searchTerm: item.searchTerm,
        id: item.id
      }
    });
  }

  const [state, setState] = React.useState({
    bottom: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleItemClick = (searchId) => {
    // Perform any desired actions when an item is clicked
    console.log('Item clicked:', searchId);
    // Example: Update the state with the clicked searchId
    props.setSearchIdState(searchId);
  };

  const list = (anchor, items, onClick) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {items.map((text, index) => (
          <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handleItemClick(text.id)}>
              <ListItemText primary={text.searchTerm} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{props.name}</Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {items && list(anchor, items, props.setSearchIdState)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
