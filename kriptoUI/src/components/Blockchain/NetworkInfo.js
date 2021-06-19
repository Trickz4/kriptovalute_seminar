import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardMedia from "@material-ui/core/CardMedia";

import Title from "../mUI/Title";

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

export default function NetworkInfo(props) {
  const [currentValue, setCurrentValue] = useState("0");
  const [networkInfo, setNetworkInfo] = useState("");
  const classes = useStyles();

  let placeholderArray = [];
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedMediumHeightPaper = clsx(classes.paper, classes.fixedMediumHeight);

  useEffect(() => {
    // Update component upon mounting
    // fetch array of transactions currently in mempool
    console.log("status updated!");
    fetch("/currentValue")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentValue(data.USD.last);
      });

    fetch("/getNetworkInfo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNetworkInfo(data);
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
            Network information
          </Typography>
          <Divider></Divider>

          {/* <ListItem>
            <ListItemText
              align="center"
              primary={`Market price:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={
                <Typography
                  variant="h3"
                  gutterBottom
                  align="center"
                  classes={{ root: classes.marketPrice }}
                >{`${currentValue.toLocaleString()} $`}</Typography>
              }
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem> */}

          <ListItem>
            <ListItemText
              align="center"
              primary={`Version:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.subversion}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
            //   align="center"
              primary={`Protocol version:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.protocolversion}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
            //   align="center"
              primary={`Active:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.networkactive ? 'True' : 'False'}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
            //   align="center"
              primary={`Connections in:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.connections_in}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
            //   align="center"
              primary={`Connections out:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.connections_out}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
            //   align="center"
              primary={`Warnings:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={networkInfo.warnings}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

        </Paper>
      </Grid>

      {/* 2nd card */}
   {/*    <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          <Title>Latest block</Title>
          <Divider />
          Chart placeholder?
        </Paper>
      </Grid> */}
    </Grid>
  );
}
