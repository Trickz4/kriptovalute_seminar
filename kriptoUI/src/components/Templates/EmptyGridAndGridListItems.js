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
  const [body, setBody] = useState("");
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
    fetch("/urlPlaceholder")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setMempoolTxsArray(data);
      });

    fetch(`/urlPlaceholder`)
      .then((response) => response.json())
      .then((data) => {
        setBody(
          <React.Fragment>
            <ListItem>
              <ListItemText
                primary={`Tx size:`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.size}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Vsize:`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.vsize}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Weight:`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.weight}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Confirmations:`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.confirmations}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Hash:`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.hash}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Input (TxID):`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.vin.map((input) => ` ${input.txid} |`)}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`Output (Tx addresses):`}
                primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                // secondary={data.vout.map((output, i) => {
                //   if (output.scriptPubKey.addresses)
                //     return ` ${output.scriptPubKey.addresses[0]}  (${output.value} BTC) |`;
                //   else return "OP_RETURN \n | ";
                // })}
                secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
              />
            </ListItem>
          </React.Fragment>
        );
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  return (
    // Grid container
    <Grid container spacing={3} justify="center">
      {/* 1st empty Grid */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          {/* INSERT DATA HERE */}
          {/* <MempoolSingleTxInfo mempoolSingleTransactionId={mempoolSingleTxId} /> */}
        </Paper>
      </Grid>

      {/* Second grid - list items */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper className={fixedMediumHeightPaper}>
          {/* INSERT DATA HERE */}
          <Title>Tx ID: {/*props.something*/}</Title>
          <Divider></Divider>
          {body}
        </Paper>
      </Grid>
    </Grid>
  );
}
