import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Title from "../mUI/Title";

// Fetch data from blockchain
let mempoolTxsArray = [];

// fetch array of transactions currently in mempool
const showMempoolTxsHandler = (event) => {
  event.preventDefault();
  console.log("pressing button works!");
  fetch("/currentPrice")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mempoolTxsArray = data;
    });
};

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
}));

export default function Orders() {
  const [mempoolTxsArray, setMempoolTxsArray] = useState(["empty"]);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("status updated!");
    fetch("/currentPrice")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMempoolTxsArray(data);
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  const classes = useStyles();

  const onSingleTxClickHandler = (transactionId) => {
    console.log("You clicked a transaction with id: ", transactionId);

    /* TODO: implement a modal popup with details about the clicked transaction */
  };





  return (
    <React.Fragment>
      <Title>Mempool transactions</Title>
      <Divider />
      {/* TODO: change font of transactions inside table */}
      <Table size="small">
        {/* <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead> */}

        {/* TODO: getmempoolentry  -> poziv za pojedinačnu transakciju (njen info) */}
        {/* TODO: Napraviti da se otvori modal kad se klikne na određenu transakciju */}

        {/* let content = categories.map((catName, i) => {
      return (
        <li
          key ={i}
          onClick = {() => {this.props.onClick(catName)}}
        >
        <p>{catName}</p>
        </li>
      )
    }); */}
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
      <div className={classes.seeMore}>
        {/* placeholder link */}
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
