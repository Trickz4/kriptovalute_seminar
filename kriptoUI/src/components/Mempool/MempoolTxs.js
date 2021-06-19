import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";




import Title from "../mUI/Title";
import MempoolSingleTxInfo from "./MempoolSingleTxInfo";

// Fetch data from blockchain
let mempoolTxsArray = [];

/* // use as an example
const showMempoolTxsHandler = (event) => {
  event.preventDefault();
  console.log("pressing button works!");
  fetch("/currentPrice")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mempoolTxsArray = data;
    });
}; */

// mock data for table
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
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

export default function MempoolTxs(props) {
  const [mempoolTxsArray, setMempoolTxsArray] = useState(["empty"]);
  const [mempoolSingleTxId, setMempoolSingleTxId] =
    useState("Empty transaction");

  useEffect(() => {
    // Update component upon mounting
    // fetch array of transactions currently in mempool
    fetch("/getRawMempool")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMempoolTxsArray(data);
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  const classes = useStyles();

  const onSingleTxClickHandler = (transactionId) => {
    // e.preventDefault()? -> probably not needed
    setMempoolSingleTxId(transactionId);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedMediumHeightPaper = clsx(classes.paper, classes.fixedMediumHeight);

  const placeholder = (
    <div>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          {/*  {<Chart />}   */} {/* Chart placeholder */}
        </Paper>
      </Grid>
    </div>
  );

  // ------------------
  // const [mempoolSingleTxId, setMempoolSingleTxId] =
  //   React.useState("tx not defined");

  //   const onFetchMempoolSingleTxHandler = (transactionId) => {
  //     setMempoolSingleTxId(transactionId);
  //     console.log("inside dashboard.js: ", transactionId);
  //     console.log(mempoolSingleTxId);
  //   };

  // -----------------

  return (
    <Grid container spacing={3} justify="center">
      {/* Recent something */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={classes.paper}>
          <MempoolSingleTxInfo mempoolSingleTransactionId={mempoolSingleTxId} />
        </Paper>
      </Grid>
      {/* Mempool transactions */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          <Title>Mempool transactions</Title>
          <Divider />
          {/* TODO: change font of transactions inside table */}
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

            <TableBody>
              {mempoolTxsArray.map((transaction, i) => (
                <TableRow
                  className={classes.TxsTableBodyRow}
                  key={i}
                  onClick={() => onSingleTxClickHandler(transaction)}
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
        </Paper>
      </Grid>
    </Grid>
  );
}
