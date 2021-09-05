import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function FallbackAvatar({
  username,
  profilePhotoURL,
  size,
  style,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={style}>
      {/* <Avatar
        alt="Remy Sharp"
        src="/broken-image.jpg"
        className={classes.orange}
      >
        B
      </Avatar> */}
      <Avatar
        alt={username}
        src={profilePhotoURL}
        className={(classes.orange, size === "small" ? classes.small : null)}
      />
      {/* <Avatar src="/broken-image.jpg" /> */}
    </div>
  );
}
