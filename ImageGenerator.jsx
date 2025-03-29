import { useState } from 'react'
import { useAI, useSpheron } from '../../hooks'
import { 
  Box, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography, 
  CircularProgress,
  Grid,
  Card,
  CardMedia
} from '@mui/material'

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('realistic')
  const [resolution, setResolution] = useState('1024x1024')
  const { generateContent, loading, error, result } = useAI()
  const { uploadToSpheron } = useSpheron()

  const handleGenerate = async () => {
    try {
      await generateContent('image', { prompt, style, resolution })
    } catch (error) {
      console.error('Generation failed:', error)
    }
  }

  const handleSaveToSpheron = async () => {
    if (!result?.imageUrl) return
    
    try {
      const response = await fetch(result.imageUrl)
      const blob = await response.blob()
      const file = new File([blob], `image-${Date.now()}.png`, { type: 'image/png' })
      await uploadToSpheron(file)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Image Generator</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Style</InputLabel>
            <Select value={style} onChange={(e) => setStyle(e.target.value)}>
              <MenuItem value="realistic">Photorealistic</MenuItem>
              <MenuItem value="cartoon">Cartoon</MenuItem>
              <MenuItem value="anime">Anime</MenuItem>
              <MenuItem value="painting">Painting</MenuItem>
              <MenuItem value="3d">3D Render</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Resolution</InputLabel>
            <Select value={resolution} onChange={(e) => setResolution(e.target.value)}>
              <MenuItem value="512x512">512x512</MenuItem>
              <MenuItem value="768x768">768x768</MenuItem>
              <MenuItem value="1024x1024">1024x1024</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            onClick={handleGenerate} 
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Image'}
          </Button>
          
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error}
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {result?.imageUrl && (
            <Card>
              <CardMedia
                component="img"
                image={result.imageUrl}
                alt="Generated image"
              />
              <Button 
                variant="outlined" 
                onClick={handleSaveToSpheron}
                sx={{ mt: 2 }}
                fullWidth
              >
                Save to Spheron
              </Button>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageGenerator