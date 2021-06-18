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
  const [txInfoJSX, setTxInfoJSX] = useState("");
  const classes = useStyles();

  let placeholderArray = [];
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedMediumHeightPaper = clsx(classes.paper, classes.fixedMediumHeight);

  let txInfo = [];
  const onSingleRowClickHandler = () => {
    // e.preventDefault()? -> probably not needed
    // setMempoolSingleTxId(transactionId);
    // do something
  };

  const onLinkClickHandler = () => {
    // e.preventDefault()? -> probably not needed
    // setMempoolSingleTxId(transactionId);
    // do something
  };

  useEffect(() => {
    // Update component upon mounting
    // fetch array of transactions currently in mempool
    console.log("status updated!");
    fetch("/currentValue")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setMempoolTxsArray(data);
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          {/* INSERT DATA HERE */}
          {/* <MempoolSingleTxInfo mempoolSingleTransactionId={mempoolSingleTxId} /> */}
        </Paper>
      </Grid>

      {/* Table template inside grid */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          <Title>Mempool transactions</Title>
          <Divider />
          <Table size="small" stickyHeader>
            {/* <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Ship To</TableCell>
          <TableCell>Payment Method</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead> */}

            {/* TABLE DATA (ROWS) */}
            <TableBody>
              {placeholderArray.map((transaction, i) => (
                <TableRow
                  className={classes.TxsTableBodyRow}
                  key={i}
                  onClick={() => onSingleRowClickHandler(transaction)}
                  cursor="pointer"
                  hover
                >
                  <TableCell align="center">{transaction}</TableCell>
                  {/* <TableCell>{row.name}</TableCell>
            <TableCell>{row.shipTo}</TableCell>
            <TableCell>{row.paymentMethod}</TableCell>
            <TableCell align="right">{row.amount}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            {/* placeholder link -> maybe implement refresh button? (dummy setState koji update-a dummy varijablu)*/}
            <Link color="primary" href="#" onClick={onLinkClickHandler}>
              See more orders
            </Link>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
