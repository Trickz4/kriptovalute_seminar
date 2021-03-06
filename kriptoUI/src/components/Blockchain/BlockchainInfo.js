import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  TxsTableBodyRow: {
    cursor: "pointer",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  fixedMediumHeight: {
    height: 400,
  },
  gridTitle: {
    color: "#8a867e",
  },
  marketPrice: {
    marginTop: "15px",
    // marginBottom: "50px",
    color: "green",
  },
}));

const ListItemTextPrimaryCSS = {
  display: "inline",
  fontWeight: "700",
  color: "black",
  fontSize: "17px",
};

const ListItemTextSecondaryCSS = {
  marginLeft: "5px",
  display: "inline",
  fontSize: "18px",
  color: "#4c4c4c",
};

export default function BlockchainInfo(props) {
  const [blockchainInfo, setBlockchainInfo] = useState("");
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedMediumHeightPaper = clsx(classes.paper, classes.fixedMediumHeight);

  useEffect(() => {
    // Update component upon mounting
    fetch("/getBlockchainInfo")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBlockchainInfo(data);
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  return (
    <Grid container spacing={3} justify="center">
      {/* 1st card */}
      <Grid item xs={12} md={10} lg={10}>
        <Paper className={classes.paper}>
          <Typography
            component="h2"
            variant="h2"
            gutterBottom
            align="center"
            classes={{ h2: classes.gridTitle }}
          >
            Blockchain info
          </Typography>
          <Divider></Divider>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Chain:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={blockchainInfo.chain}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Blocks (height):`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={blockchainInfo.blocks}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Difficulty:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={blockchainInfo.difficulty}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Size on disk:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={`~${Math.round(blockchainInfo.size_on_disk/1024/1024/1024)} GB`}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Warnings:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={blockchainInfo.warnings}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

        </Paper>
      </Grid>

      {/* 2nd card */}
    {/*   <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          <Title>Latest block</Title>
          <Divider />
          Chart placeholder?
        </Paper>
      </Grid> */}
    </Grid>
  );
}
