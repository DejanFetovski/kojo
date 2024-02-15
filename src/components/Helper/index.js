import axios from 'axios'
import qs from 'qs'

export const baseURL = ''

export const saveWalletTransaction = async (
  walletAddress,
  stakeToken,
  txHash,
  solAmount
) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: baseURL + 'save-transaction',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        walletAddress,
        stakeToken,
        txHash,
        solAmount,
      }),
    }
    axios
      .request(config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      })
  })
}

export const getWalletHistory = async (walletAddress) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: baseURL + 'get-wallet-History',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        walletAddress,
      }),
    }
    axios
      .request(config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      })
  })
}

export const getStage = async () => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'GET',
      url: baseURL + 'get-stage',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    axios
      .request(config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log('getStage error', error.message)
        resolve(false)
      })
  })
}

export const getAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: baseURL + 'get-admin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: { data },
    }
    axios
      .request(config)
      .then(function (response) {
        if (response?.data?.success) {
          resolve({ status: true, address: response.data.data })
        } else {
          resolve({ status: false, address: 'Please try again' })
        }
      })
      .catch(function (error) {
        console.log('getStage error', error.message)
        resolve({ status: false, message: 'Please try again' })
      })
  })
}

export const checkIsAdmin = async (walletAddress) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: baseURL + 'is-admin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        walletAddress,
      }),
    }
    axios
      .request(config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      })
  })
}

export const timeStampsToDateConverterForInput = (timestamp) => {
  let date = new Date(timestamp)
  const inputDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1)
  return inputDate
}

export const updatePresale = async (data) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: baseURL + 'update-presale',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    }
    axios
      .request(config)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      })
  })
}

export const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = '0.' + new Array(e).join('0') + x.toString().substring(2)
    }
  } else {
    var e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join('0')
    }
  }
  return x
}
