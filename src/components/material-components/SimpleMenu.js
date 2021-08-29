import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu({
  menuTitle,
  menuItems: { itemTitles, func },
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buttonTittle, setButtonTitle] = React.useState(menuTitle);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {buttonTittle}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {itemTitles.map((itemTitle, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                func(itemTitle);
                handleClose();
                setButtonTitle(itemTitle);
              }}
            >
              {itemTitle}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
