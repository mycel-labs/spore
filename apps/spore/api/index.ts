import express, { Request, Response, NextFunction } from 'express'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import * as dotenv from "dotenv";
import { query, validationResult } from "express-validator";


const app = express()
const port = process.env.PORT || 8081

type ClaimFaucetResponse = {
  code: number;
  rawLog?: string;
  txHash: string;
}

function getErrorMessage(err: string, response?: DeliverTxResponse): ClaimFaucetResponse {
  return {
    code: -1,
    rawLog: err,
    txHash: response?.transactionHash ?? "",
  };
}

;

async function claimFaucet(address: string) {
  // Load environment variables
  dotenv.config();
  const amount = process.env.FAUCET_AMOUNT ?? "1000000";
  const threashold = process.env.VITE_FAUCET_CLAIMABLE_THRESHOLD ?? "300000";
  const faucetMnemonic = process.env.FAUCET_MNEMONIC ?? "";
  const rpc = process.env.VITE_WS_TENDERMINT ?? "";

  // Create faucet signer
  const faucetSigner = (await DirectSecp256k1HdWallet.fromMnemonic(faucetMnemonic, {
    prefix: "mycel",
  }));
  const faucetAddress = (await faucetSigner.getAccounts())[0].address;
  const faucetClient = await SigningStargateClient.connectWithSigner(rpc, faucetSigner);

  // Check if faucet has enough balance
  const balance = await faucetClient.getBalance(address, "umycel").catch((err) => {
    return err
  });

  if (balance.amount > threashold) {
    return getErrorMessage("Faucet has insufficient balance");
  }

  // Send tokens
  const response = await faucetClient
    .sendTokens(faucetAddress, address, [{ denom: "umycel", amount: amount }], {
      amount: [{ denom: "umycel", amount: amount }],
      gas: "200000",
    })
    .then((res: DeliverTxResponse) => {
      return { code: res.code, rawLog: res.msgResponses, txResponse: res.transactionHash };
    })
    .catch((err) => {
      return err;
    });
  return response;
}

const claimFaucetValidator = [
  query("address").isString().matches(/^mycel[a-zA-Z0-9]*$/),
];



app.get('/api', (_req: Request, res: Response) => {
  return res.send('Hello World 🌍')
})

app.get('/api/faucet', claimFaucetValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(getErrorMessage("Invalid address"));
  }
  try {
    const response = await claimFaucet(req.query.address as string);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(getErrorMessage(err.message));
  }
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

export default app

