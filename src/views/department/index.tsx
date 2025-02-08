'use client'

// Next Auth Imports
// import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid'

// import StudentTable from './studentTable'

//component imports
// import FeatureTabs from './FeatureTabs'
import DepartmentTable from './departmentTable'

const DepartmentView = () => {
  // const session = useSession()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DepartmentTable />
      </Grid>
    </Grid>
  )
}

export default DepartmentView
