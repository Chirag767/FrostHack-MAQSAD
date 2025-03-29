import axios from 'axios'

const API_BASE_URL = process.env.VITE_AI_API_BASE_URL || 'https://api.frosthack.ai/v1'

export const generateImage = async (prompt, style, resolution) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/image`, {
      prompt,
      style,
      resolution,
    })
    return response.data
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export const generateText = async (prompt, genre, length) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/text`, {
      prompt,
      genre,
      length,
    })
    return response.data
  } catch (error) {
    console.error('Error generating text:', error)
    throw error
  }
}

export const generateAudio = async (prompt, genre, duration) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/audio`, {
      prompt,
      genre,
      duration,
    })
    return response.data
  } catch (error) {
    console.error('Error generating audio:', error)
    throw error
  }
}

export const generateVideo = async (prompt, style, duration) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/video`, {
      prompt,
      style,
      duration,
    })
    return response.data
  } catch (error) {
    console.error('Error generating video:', error)
    throw error
  }
}