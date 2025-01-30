'use client'

// Next Auth Imports
// import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid'

// import StudentTable from './studentTable'

//component imports
// import FeatureTabs from './FeatureTabs'
import UserTable from './userTable'

const UserView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTable />
      </Grid>
    </Grid>
  )
}

export default UserView
