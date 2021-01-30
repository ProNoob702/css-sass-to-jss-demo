import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    paddingBottom: theme.spacing(1),
    paddingRight: "55%",
  },
  langSelectionZone: {
    paddingLeft: theme.spacing(1),
  },
  editorsZone: {
    flexGrow: 1,
  },
  editorWrapper: {
    height: "100%",
    width: "45%",
  },
  editor: {
    height: "100% !important",
    width: "100% !important",
  },
  convertBtn: {
    width: "10%",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCenterRow: {
    display: "flex",
    justifyContent: "center",
  },
}));
