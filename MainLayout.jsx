import { Box, CssBaseline } from '@mui/material'
import Header from './common/Header'
import Footer from './common/Footer'
import { useAuth } from '../contexts/AuthContext'

const MainLayout = ({ children }) => {
  const { user } = useAuth()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header user={user} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout