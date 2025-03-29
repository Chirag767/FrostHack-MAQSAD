import { 
    Box, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    Button,
    Tabs,
    Tab
  } from '@mui/material'
  import { useState } from 'react'
  import TemplateGallery from '../components/dashboard/TemplateGallery'
  import CreationHistory from '../components/dashboard/CreationHistory'
  
  const Dashboard = () => {
    const [tabValue, setTabValue] = useState(0)
  
    const handleChange = (event, newValue) => {
      setTabValue(newValue)
    }
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>My Dashboard</Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Creation History" />
            <Tab label="Template Gallery" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && <CreationHistory />}
        {tabValue === 1 && <TemplateGallery />}
      </Box>
    )
  }
  
  export default Dashboard