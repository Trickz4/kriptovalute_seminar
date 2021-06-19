import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";

import Title from "../mUI/Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

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

export default function MempoolSingleTxInfo(props) {
  const [txInfoJSX, setTxInfoJSX] = useState("");
  const classes = useStyles();

  useEffect(() => {
    // Update component upon mounting

    // Rpc Warning: parameter 1 must be of length 64
    if (props.mempoolSingleTransactionId.length === 64) {
      fetch(`/getRawTransaction/?id=${props.mempoolSingleTransactionId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setTxInfoJSX(
            <React.Fragment>
              <ListItem>
                <ListItemText
                  primary={`Size:`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.size}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`Vsize:`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.vsize}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`Weight:`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.weight}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>

{/*               <ListItem>
                <ListItemText
                  primary={`Confirmations:`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.confirmations}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem> */}

              <ListItem>
                <ListItemText
                  primary={`Hash:`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.hash}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`Input (TxID):`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.vin.map((input) => ` ${input.txid} |`)}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`Output (Tx addresses):`}
                  primaryTypographyProps={{ style: ListItemTextPrimaryCSS }}
                  secondary={data.vout.map((output, i) => {
                    if (output.scriptPubKey.addresses)
                      return ` ${output.scriptPubKey.addresses[0]}  (${output.value} BTC) |`;
                    else return "OP_RETURN \n | ";
                  })}
                  secondaryTypographyProps={{ style: ListItemTextSecondaryCSS }}
                />
              </ListItem>
            </React.Fragment>
          );
        });
    }
  }, [props.mempoolSingleTransactionId]); // Dependency -> if the prop changes, rerender the component

  return (
    <React.Fragment>
      <Title>Tx ID: {props.mempoolSingleTransactionId}</Title>
      <Divider></Divider>
      {txInfoJSX}
    </React.Fragment>
  );
}
