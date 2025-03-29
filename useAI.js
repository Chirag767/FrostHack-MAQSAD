import { useState } from 'react'
import { 
  generateImage, 
  generateText, 
  generateAudio, 
  generateVideo 
} from '../api/aiServices'

export const useAI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const generateContent = async (type, options) => {
    setLoading(true)
    setError(null)
    try {
      let response
      switch (type) {
        case 'image':
          response = await generateImage(options.prompt, options.style, options.resolution)
          break
        case 'text':
          response = await generateText(options.prompt, options.genre, options.length)
          break
        case 'audio':
          response = await generateAudio(options.prompt, options.genre, options.duration)
          break
        case 'video':
          response = await generateVideo(options.prompt, options.style, options.duration)
          break
        default:
          throw new Error('Invalid content type')
      }
      setResult(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { generateContent, loading, error, result }
}