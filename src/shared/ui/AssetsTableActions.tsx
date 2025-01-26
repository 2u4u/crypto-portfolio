import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreHoriz as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

export const AssetsTableActions = ({
  id,
  onOpen,
}: {
  id: string;
  onOpen: (id: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInfo = () => {
    onOpen(id);
  };

  return (
    <>
      <IconButton
        sx={{ color: "var(--cp-grey-600)" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleInfo}>View Detailed Info</MenuItem>
      </Menu>
    </>
  );
};
