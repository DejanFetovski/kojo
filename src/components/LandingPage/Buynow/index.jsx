import { useState, useEffect } from 'react'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import useToast from '../../Common/Hooks/useToast'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {
  saveWalletTransaction,
  toFixedd,
  getStage,
  getWalletHistory,
  getAdmin,
} from '../../Helper'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import createTransferTransaction from './createTransferTransaction'

const Buynow = () => {
  const { toastSuccess, toastError, toastWarning } = useToast()
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [loaderAct, setloaderAct] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [solAmount, setSolAmount] = useState('')
  const [totalBuyTokenByUser, setTotalBuyTokenByUser] = useState(0.0)
  const [solToken, setSolToken] = useState('')
  const [userBalance, setUserBalance] = useState('0:00')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [presaleEnded, setPresaleEnded] = useState('Presale Ends In')
  const intialData = {
    tokenPrice: 0,
    launchPrice: 0,
    raisedSol: 0,
    totalSol: 0,
    progressPercentage: 0,
    endDate: 0,
    adminPubKey: '',
  }
  const [stageStatus, setStageStatus] = useState(intialData)

  useEffect(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60

    const calculateCountdown = () => {
      const now = new Date().getTime()
      const distance = countDownDate - now
      if (distance < 0) {
        setPresaleEnded('Presale End')
        clearInterval(countdownInterval)
      } else {
        setPresaleEnded('Presale Ends In')
        // Calculate total hours and remaining minutes and seconds
        const totalHours = Math.floor(distance / hour)
        const remainingMinutes = Math.floor((distance % hour) / minute)
        const remainingSeconds = Math.floor((distance % minute) / second)
        setHours(totalHours)
        setMinutes(remainingMinutes)
        setSeconds(remainingSeconds)
      }
    }

    // Set the countdown to 24 hours from now
    const countDownDate = Number(stageStatus.endDate)

    const countdownInterval = setInterval(calculateCountdown, 1000)

    return () => {
      clearInterval(countdownInterval)
    }
  }, [stageStatus.endDate])

  useEffect(() => {
    if (publicKey) {
      // Function to get the wallet balance
      const getWalletBalance = async (walletAddress) => {
        try {
          if (!walletAddress) {
            setUserBalance(0)
            return false
          }

          // Convert the wallet address to a PublicKey
          const publicKey = new PublicKey(walletAddress)

          // Get the balance
          const balance = await connection.getBalance(publicKey)

          console.log('balance', balance)

          setUserBalance((balance / LAMPORTS_PER_SOL).toFixed(2))
        } catch (error) {
          console.error('Error in getWalletBalance:', error.message)
        }
      }
      getWalletBalance(walletAddress)
    }
  }, [publicKey, walletAddress])

  useEffect(() => {
    let isAPISubscribed = true
    const getStageDetails = async () => {
      try {
        let stageData = await getStage()
        if (stageData?.data?.success) {
          const timestamp = new Date(stageData?.data?.data?.endDate)
          const percentage =
            (stageData?.data?.data?.raisedSol /
              stageData?.data?.data?.totalSol) *
            100
          setStageStatus({
            tokenPrice: stageData?.data?.data?.tokenPrice,
            launchPrice: stageData?.data?.data?.launchPrice,
            raisedSol: stageData?.data?.data?.raisedSol,
            totalSol: stageData?.data?.data?.totalSol,
            progressPercentage: percentage,
            adminPubKey: stageData?.data?.data?.adminPubKey,
            endDate: timestamp.getTime(),
          })
        } else {
        }
      } catch (error) {
        console.error('Error in getWalletBalance:', error.message)
      }
    }
    if (isAPISubscribed) {
      getStageDetails()
    }
    return () => {
      isAPISubscribed = false
    }
  }, [])

  // Sign a transaction
  const send = async () => {
    try {
      if (!solAmount || solAmount <= 0) {
        return toastWarning('Please enter valid sol amount')
      }

      // if (Number(userBalance) < Number(solAmount)) {
      //   return toastWarning("You don't have enough SOL balance");
      // }

      if (stageStatus.adminPubKey === '' || !stageStatus.adminPubKey) {
        return toastError('Try again')
      }

      setloaderAct(true)

      const getAdminAddress = await getAdmin(solAmount)

      if (!getAdminAddress?.status) {
        setloaderAct(false)
        return toastError('Please try again')
      }

      const transaction = await createTransferTransaction(
        solAmount,
        publicKey,
        connection,
        getAdminAddress.address
      )

      // Sign the transaction with the user's wallet
      const signedTransaction = await signTransaction(transaction)

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      )

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'processed')
      if (signature) {
        let isSaved = await saveWalletTransaction(
          walletAddress,
          solToken,
          signature,
          solAmount
        )
        if (isSaved.data.success) {
          checkIfWalletIsConnected()
          setSolAmount('')
          setSolToken('')
          toastSuccess(
            'Congratulations! Your transaction is confirmed on the blockchain. Once the presale concludes, you’ll be able to claim your tokens.'
          )
        } else {
          toastError(
            'Transaction confirmed, getting error while saving transaction'
          )
        }
      } else {
        toastError('Transaction failed')
      }
      setloaderAct(false)
    } catch (error) {
      setloaderAct(false)
      console.error('Error signing and sending transaction:', error)
      return toastError(error.message)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (publicKey) {
        let response = publicKey.toString()
        setWalletAddress(response)
        let tokenBalance = await getWalletHistory(response)
        tokenBalance = tokenBalance?.data.success
          ? Number(tokenBalance.data.data.tokenBalance).toFixed(2)
          : '0.00'
        console.log('tokenBalance', tokenBalance)
        setTotalBuyTokenByUser(tokenBalance)
      } else {
        setTotalBuyTokenByUser('0.00')
        setWalletAddress('')
        return false
      }
    } catch (error) {
      setTotalBuyTokenByUser('0.00')
      setWalletAddress('')
      console.error(error.message)
    }
  }
  // On load, check if Phantom Wallet is connected
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [publicKey])

  const handleInput = (e) => {
    const inputValue = e.target.value
    if (Number(inputValue) >= 0) {
      // let value = Number(inputValue) / Number(stageStatus.tokenPrice);
      let value = Number(inputValue) / 0.000001
      setSolAmount(inputValue)
      value = toFixedd(value)
      value = value ? value.toFixed(2) : value
      setSolToken(value)
    } else {
      setSolAmount('')
      setSolToken('')
    }
  }

  return (
    <section className="presale-box">
      <div className="container">
        <div className="row">
          <div className="col-md-4 presale-left">
            <div className="presale-left-in text-center">
              <article>
                <h2>{presaleEnded}</h2>
                <div className="presale-time ">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="time-number">{hours}</div>
                      <span>Hours</span>
                    </div>
                    <div className="col-md-4">
                      <div className="time-number">{minutes}</div>
                      <span>Mins</span>
                    </div>
                    <div className="col-md-4">
                      <div className="time-number">{seconds}</div>
                      <span>Sec</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="col-md-8 presale-right">
            <div className="presale-right-in">
              <div className="presale-head-right">
                <p>
                  <b>
                    Your Holdings:{' '}
                    <span style={{ color: 'var(--yellow)' }}>
                      {totalBuyTokenByUser} Kojo
                    </span>
                  </b>
                </p>
                <p>
                  <b>
                    Funds Raised:{' '}
                    <span style={{ color: 'var(--yellow)' }}>
                      {stageStatus.raisedSol?.toFixed(2)} SOL{' '}
                    </span>
                  </b>
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex mb-2">
                    <label>SOL Payment Amount:</label>
                    <span className="ms-auto">
                      <i className="ri-wallet-line"></i> {userBalance} SOL
                    </span>
                  </div>
                  <div className="form-input">
                    <input
                      type="number"
                      placeholder="Min 0.5 SOL | Max 50 SOL"
                      value={solAmount}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <div className="form-input-ic">
                      <img src="images/Solana_logo.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex mb-2">
                    <label>KOJO Received Amount:</label>
                  </div>
                  <div className="form-input">
                    <input
                      type="number"
                      name=""
                      value={solToken}
                      disabled
                      className="form-control"
                    />
                    <div className="form-input-ic">
                      <img src="images/logo-icon.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="presale-action mt-3 d-flex align-items-center">
                {/* <button className="btn btn-red">Select Wallet</button> */}

                {!publicKey ? (
                  <WalletMultiButton />
                ) : loaderAct ? (
                  <>
                    <button className="btn-red  btn" disabled={true}>
                      Processing ...
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-red btn" onClick={send}>
                      Buy now
                    </button>
                  </>
                )}
                <p className="mb-0 ms-3">
                  Dont Prefer Wallet Connection? <br />
                  <a href="#qr-sec">Use Direct Transfer</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section className="banner-home" id="home">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-4 ms-auto banner-right">
    //         <div className="timer-box">
    //           <h4 className="text-center">{presaleEnded}</h4>
    //           <ul className="row">
    //             <li className="col-md-4">
    //               <div className="timer-box-in">
    //                 <h4>{hours}</h4>
    //                 <span>Hours</span>
    //               </div>
    //             </li>
    //             <li className="col-md-4">
    //               <div className="timer-box-in">
    //                 <h4>{minutes}</h4>
    //                 <span>Mins</span>
    //               </div>
    //             </li>
    //             <li className="col-md-4">
    //               <div className="timer-box-in">
    //                 <h4>{seconds}</h4>
    //                 <span>Sec</span>
    //               </div>
    //             </li>
    //           </ul>
    //         </div>
    //         <div className="swap-box">
    //           <div className="swap-box-in">
    //             <div className="swap-box-head">
    //               <h4 className="text-center">
    //                 Your Holdings: <span style={{ color: "rgb(217 115 14)" }}>{totalBuyTokenByUser} $PonkeWifHat</span>
    //               </h4>
    //             </div>
    //             <div className="swap-box-head">
    //               <h4 className="text-center">
    //                 Funds Raised: <span style={{ color: "rgb(217 115 14)" }}>{stageStatus.raisedSol?.toFixed(2)} SOL </span>
    //               </h4>
    //             </div>
    //             <div className="swap-form">
    //               <div className="row">
    //                 {/* <div className="col-sm-6"> */}
    //                   <div className="d-flex">
    //                     <label>SOL Payment Amount:</label>
    //                       <span className="ms-auto">
    //                         <i className="ri-wallet-line"></i> {userBalance} SOL
    //                       </span>
    //                   </div>
    //                   <div className="form-group mb-3">
    //                     <div className="form-input">
    //                       <input type="number" placeholder="Min 0.5 SOL | Max 50 SOL" value={solAmount} onChange={handleInput} className="form-control" />
    //                       <div className="input-icon">
    //                         <span>
    //                           <img src="images/Solana_logo.png" alt="" />
    //                         </span>
    //                       </div>
    //                     </div>
    //                     {/* {!isMobile && publicKey ? (
    //                       <span className="ms-auto mt-2">
    //                         <i className="ri-wallet-line"></i> {userBalance} SOL
    //                       </span>
    //                     ) : (
    //                       ""
    //                     )} */}
    //                   </div>
    //                 {/* </div> */}
    //                 {/* <div className="col-sm-6"> */}
    //                   <label>PonkeWifHat Received Amount:</label>
    //                   <div className="form-group mb-3">
    //                     <div className="form-input">
    //                       <input type="number" name="" value={solToken} disabled className="form-control" />
    //                       <div className="input-icon">
    //                         <span>
    //                           <img src="images/logo.png" alt="" />
    //                         </span>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               {/* </div> */}
    //               {!publicKey ? (
    //                 <WalletMultiButton />
    //               ) : loaderAct ? (
    //                 <>
    //                   <button className="w-100 btn-orange  btn mt-2" disabled={true}>
    //                     Processing ...
    //                   </button>
    //                 </>
    //               ) : (
    //                 <>
    //                   <button className="w-100   btn-orange btn mt-2" onClick={send}>
    //                     Buy now
    //                   </button>
    //                 </>
    //               )}
    //               <div className="swap-last-line text-center mt-2">
    //                 <p>
    //                   Dont Prefer Wallet Connection?{" "}
    //                   <a href="#qr-sec">
    //                     Use Direct Transfer
    //                   </a>
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default Buynow
