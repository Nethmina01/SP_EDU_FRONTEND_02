'use client'

// Next Auth Imports
// import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid'

import DivisionTable from './divisionTable'

// import StudentTable from './studentTable'

//component imports
// import FeatureTabs from './FeatureTabs'

const DivisionView = () => {
  // const session = useSession()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DivisionTable />
      </Grid>
    </Grid>
  )
}

export default DivisionView
