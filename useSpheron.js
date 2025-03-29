import { useState } from 'react'
import { initializeSpheron, allocateGPUResources } from '../api/spheron'

export const useSpheron = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const uploadToSpheron = async (file) => {
    setLoading(true)
    setError(null)
    try {
      const response = await initializeSpheron(file)
      setResult(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const allocateGPU = async (taskComplexity) => {
    setLoading(true)
    setError(null)
    try {
      const response = await allocateGPUResources(taskComplexity)
      setResult(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { uploadToSpheron, allocateGPU, loading, error, result }
}