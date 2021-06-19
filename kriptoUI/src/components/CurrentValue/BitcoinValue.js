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
    color: "orange",
  },
  marketPrice: {
    marginTop: "15px",
    // marginBottom: "50px",
    color:"green",
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
  fontSize: "15px",
  color: "#4c4c4c",
};

export default function BitcoinValue(props) {
  const [currentValue, setCurrentValue] = useState("0");
  const [blockchainStats, setBlockchainStats] = useState("");
  const classes = useStyles();

  let placeholderArray = [];
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedMediumHeightPaper = clsx(classes.paper, classes.fixedMediumHeight);

  useEffect(() => {
    // Update component upon mounting
    console.log("status updated!");
    fetch("/currentValue")
      .then((response) => response.json())
      .then((data) => {
        setCurrentValue(data.USD.last);
      });

    fetch("/blockchainStats")
      .then((response) => response.json())
      .then((data) => {
        setBlockchainStats(data);
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
            Market Data
          </Typography>
          <Divider></Divider>

          <ListItem>
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
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Market cap:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={`${Math.round(
                (blockchainStats.totalbc / 100000000) * currentValue
              ).toLocaleString()} $`}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Circulating supply:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={`${(
                blockchainStats.totalbc / 100000000
              ).toLocaleString()} BTC`}
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              align="center"
              primary={`Transactions per day:`}
              primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
              secondary={
                blockchainStats.n_tx &&
                `${blockchainStats.n_tx.toLocaleString()}`
              }
              secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
            />
          </ListItem>
        </Paper>
      </Grid>

      {/* 2nd card */}
   {/*    <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          <Title>Mempool transactions</Title>
          <Divider />
          Chart placeholder?
        </Paper>
      </Grid> */}
    </Grid>
  );
}
