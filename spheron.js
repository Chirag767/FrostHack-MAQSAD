import { SpheronClient, Protocol } from '@spheron/storage'
import axios from 'axios'

const SPHERON_TOKEN = process.env.VITE_SPHERON_TOKEN

export const initializeSpheron = async (file) => {
  try {
    const client = new SpheronClient({ token: SPHERON_TOKEN })
    const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
      file,
      {
        protocol: Protocol.IPFS,
        name: `frosthack-${Date.now()}`,
        onUploadInitiated: (uploadId) => {
          console.log('Upload initiated with ID:', uploadId)
        },
        onChunkUploaded: (uploadedSize, totalSize) => {
          console.log(`Uploaded ${uploadedSize} of ${totalSize}`)
        },
      }
    )
    return { uploadId, bucketId, protocolLink, dynamicLinks }
  } catch (error) {
    console.error('Error initializing Spheron:', error)
    throw error
  }
}

export const allocateGPUResources = async (taskComplexity) => {
  try {
    const response = await axios.post('https://api.spheron.network/v1/gpu/allocate', {
      taskType: taskComplexity,
      duration: '1h', // default duration
    }, {
      headers: {
        Authorization: `Bearer ${SPHERON_TOKEN}`,
      }
    })
    return response.data
  } catch (error) {
    console.error('Error allocating GPU resources:', error)
    throw error
  }
}
const apiKey = import.meta.env.VITE_SPHERON_TOKEN; 
// Vite uses `import.meta.env` (not `process.env`)