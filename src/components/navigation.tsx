import * as React from "react";
import { useStyles } from "../App.styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export enum NavigationItems {
  JSSTOCSS = "JSSTOSASS",
  CSSTOJSS = "CSSTOJSS",
}

const navigationItems = [
  { id: "CSSTOJSS", label: "𝘾𝙎𝙎 𝙏Ø 𝙅𝙎𝙎" },
  { id: "JSSTOSASS", label: "𝙅𝙎𝙎 𝙏Ø 𝙎𝘼𝙎𝙎" },
];

export const NavigationPanel: React.FC<{
  panelItemClicked: (clickedItem: string) => any;
}> = ({ panelItemClicked }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AppBar elevation={1} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            𝘾𝙤𝙣𝙫𝙚𝙧𝙩𝙚𝙧𝙨
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {navigationItems.map((x) => (
          <React.Fragment key={x.id}>
            <ListItem
              button
              className={classes.navigationItem}
              onClick={() => panelItemClicked(x.id)}
            >
              <ListItemText primary={x.label} />
            </ListItem>
            <Divider style={{ borderColor: "white" }} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};
