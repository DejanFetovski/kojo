import { useState, useEffect } from 'react'
import {
  checkIsAdmin,
  getStage,
  updatePresale,
  timeStampsToDateConverterForInput,
} from '../Helper'
import { useNavigate } from 'react-router-dom'
import useToast from '../Common/Hooks/useToast'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const solanaAddressRegex = /^([1-9A-HJ-NP-Za-km-z]{44})$/

function isValidSolanaAddress(address) {
  return solanaAddressRegex.test(address)
}

export default function Index() {
  const { toastSuccess, toastError } = useToast()

  const { publicKey } = useWallet()
  const navigate = useNavigate()
  const [loaderAct, setloaderAct] = useState(false)
  const [isAdminWallet, setIsAdminWallet] = useState(false)
  const [formData, setFormData] = useState({
    tokenPrice: '',
    launchPrice: '',
    raisedSol: '',
    totalSol: '',
    endDate: '',
    walletAddress: '',
    adminPubKey: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'endDate') {
      const formattedDate = Date.parse(value)
      setFormData({
        ...formData,
        [name]: value,
        formattedEndDate: formattedDate,
      })
    } else if (name === 'adminPubKey') {
      let updatedValue = value.trim()
      setFormData({
        ...formData,
        [name]: updatedValue,
      })
    } else {
      // Allow only numeric values for other fields
      if (!isNaN(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (publicKey) {
      setloaderAct(true)
      let connectedWalletAddress = publicKey?.toString().toLowerCase()
      if (isValidSolanaAddress(formData.adminPubKey)) {
        let data = { ...formData, walletAddress: connectedWalletAddress }
        let isUpdated = await updatePresale(data)
        if (isUpdated?.success) {
          setloaderAct(false)
          toastSuccess('Presale data Updated')
          setTimeout(() => {
            navigate('/')
          }, 3000)
        } else {
          setloaderAct(false)
          toastError(`${isUpdated.msg}!`)
        }
      } else {
        toastError(`Invalid admin wallet address`)
        setloaderAct(false)
      }
    } else {
      setloaderAct(false)
    }
  }

  useEffect(() => {
    let isAPISubscribed = true
    // Function to get the wallet balance
    const getStageDetails = async () => {
      if (isAdminWallet) {
        try {
          let stageData = await getStage()
          if (stageData?.data.success) {
            setFormData({
              tokenPrice: stageData?.data?.data?.tokenPrice,
              launchPrice: stageData?.data?.data?.launchPrice,
              raisedSol: stageData?.data?.data?.raisedSol,
              totalSol: stageData?.data?.data?.totalSol,
              adminPubKey: stageData?.data?.data?.adminPubKey,
              endDate: timeStampsToDateConverterForInput(
                stageData?.data?.data?.endDate
              ),
            })
          } else {
          }
        } catch (error) {
          console.error('Error in getWalletBalance:', error.message)
        }
      }
    }
    if (isAPISubscribed) {
      getStageDetails()
    }
    return () => {
      isAPISubscribed = false
    }
  }, [isAdminWallet])

  const checkIfWalletIsConnected = async () => {
    try {
      if (publicKey) {
        let isAdmin = await checkIsAdmin(publicKey.toString())
        isAdmin = isAdmin?.data.success
        console.log(isAdmin)
        if (isAdmin) {
          setIsAdminWallet(true)
        } else {
          setIsAdminWallet(false)
        }
      } else {
        setIsAdminWallet(false)
      }
    } catch (error) {}
  }
  useEffect(() => {
    let isAPISubscribed = true
    if (isAPISubscribed) {
      checkIfWalletIsConnected()
    }
    return () => {
      isAPISubscribed = false
    }
  }, [publicKey])

  return (
    <>
      <div className="site-wraper admin">
        <section className="why-section section-padding">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <h4 className="text-center">$Kojo Admin Panel</h4>
              <div className="col-12 col-md-6 col-lg-6">
                {isAdminWallet ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="adminPubKey" className="form-label">
                        Admin Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adminPubKey"
                        name="adminPubKey"
                        value={formData.adminPubKey}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tokenPrice" className="form-label">
                        Token Price:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="tokenPrice"
                        name="tokenPrice"
                        value={formData.tokenPrice}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="launchPrice" className="form-label">
                        Launch Price:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="launchPrice"
                        name="launchPrice"
                        value={formData.launchPrice}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="raisedSol" className="form-label">
                        Raised SOL:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="raisedSol"
                        name="raisedSol"
                        value={formData.raisedSol}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="totalSol" className="form-label">
                        Total SOL:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="totalSol"
                        name="totalSol"
                        value={formData.totalSol}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">
                        End Date:
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {loaderAct ? (
                      <>
                        <button className="btn  btn-orange" disabled={true}>
                          Processing ...
                        </button>
                      </>
                    ) : (
                      <button type="submit" className="btn  btn-red">
                        Submit
                      </button>
                    )}
                  </form>
                ) : (
                  <div className="m-auto">
                    <div className="d-block w-100">
                      <WalletMultiButton />
                    </div>
                    <div className="d-block w-100">
                      <p className="text-center mt-3">
                        Please connect with admin wallet address
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
