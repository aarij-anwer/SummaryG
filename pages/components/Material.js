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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Material(props) {
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
    console.log('Item clicked: ', searchId);
    props.setSearchIdState(searchId);
  };

  const list = (anchor, items, onClick) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="bg-gray-800 text-white">
        {items.map((text, index) => (
          <ListItem key={index} className="py-2 hover:bg-gray-700 rounded" disablePadding>
            <ListItemButton onClick={() => handleItemClick(text.id)}>
              <ListItemText primary={text.searchTerm} primaryTypographyProps={{ style: { textTransform: 'none' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={"w-full fixed left-1/2 bottom-0 transform -translate-x-1/2"}>
      <React.Fragment key={anchor}>
        <Button
          style={{
            textTransform: 'none',
            fontSize: '18px',
            borderRadius: 0
          }}
          className="w-full bg-gray-800 text-white hover:bg-gray-400 shadow-md pt-0 pr-0 pl-0 pb-4 group flex items-center justify-center"
          onClick={toggleDrawer(anchor, true)}
        >
          <ArrowDropDownIcon className="transform transition-transform duration-200 group-hover:rotate-180" />
          {props.name}
        </Button>
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
