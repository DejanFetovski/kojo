import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'

const createTransferTransaction = async (
  solAmount,
  publicKey,
  connection,
  adminPubKey
) => {
  const lamports = LAMPORTS_PER_SOL * solAmount // 0.01 SOL
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(publicKey.toString()),
      toPubkey: new PublicKey(adminPubKey),
      lamports: lamports,
    })
  )
  transaction.feePayer = publicKey
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash

  return transaction
}

export default createTransferTransaction
