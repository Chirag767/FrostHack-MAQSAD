import { useState } from 'react'
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography 
} from '@mui/material'
import ImageGenerator from '../components/creation/ImageGenerator'
import TextGenerator from '../components/creation/TextGenerator'
import AudioGenerator from '../components/creation/AudioGenerator'
import VideoGenerator from '../components/creation/VideoGenerator'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const Create = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h3" gutterBottom>Create Content</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="content creation tabs">
          <Tab label="Images" />
          <Tab label="Text" />
          <Tab label="Audio" />
          <Tab label="Video" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <ImageGenerator />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TextGenerator />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AudioGenerator />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <VideoGenerator />
      </TabPanel>
    </Box>
  )
}

export default Create