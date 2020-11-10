import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Icon, Typography, IconButton, Slide, Button } from '@material-ui/core';

interface ICustomAppBar {
  title: string,
  rightButtons: { text: string, onClick: () => void }[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CustomAppBar(props: ICustomAppBar) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ padding: 10 }} >
      <AppBar position="static" style={{ borderRadius: 25 }} >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {props.rightButtons.map((button, key) => {
            return <Button onClick={button.onClick} >{button.text}</Button>
          })}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CustomAppBar;