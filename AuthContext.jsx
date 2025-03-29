import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      
      setUser({ address, provider, signer })
      localStorage.setItem('userAddress', address)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setUser(null)
    localStorage.removeItem('userAddress')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const savedAddress = localStorage.getItem('userAddress')
      if (savedAddress) {
        await connectWallet()
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)