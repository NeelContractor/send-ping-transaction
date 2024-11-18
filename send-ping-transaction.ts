const {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

const PRIVATE_KEY = Uint8Array.from(process.env.PRIVATE_KEY);

const connection = new Connection(clusterApiUrl("devnet"));

const PING_PROGRAM_ADDRESS = new PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

(async () => {
  const payer = Keypair.fromSecretKey(PRIVATE_KEY);

  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });

  transaction.add(instruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);

  console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
})();

