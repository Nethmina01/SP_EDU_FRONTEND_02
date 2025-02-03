'use client'

// Next Imports
import type { SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import { Button, CircularProgress, MenuItem } from '@mui/material'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import axios from '@/utils/axios'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@/components/DirectionalIcon'
import { getDepartments } from '@/actions/department/department'

type FormValues = {
  departmentName: string
  divisionName: string
  description: string
}

type AxiosErrorResponse = {
  response?: {
    data?: {
      data?: string
    }
  }
}

const formSchema = z.object({
  departmentName: z.string().min(2, { message: 'Department name should be more than 2 characters long' }),
  divisionName: z.string().min(2, { message: 'Division name should be more than 2 characters long' })
})

const AddDivisionForm: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([])
  const [loadingDepartments, setLoadingDepartments] = useState(true)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        getDepartments().then((data: SetStateAction<any[]>) => {
          setDepartments(data)
        })
      } catch (error) {
        console.error('Failed to fetch departments', error)
      } finally {
        setLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      departmentName: '',
      divisionName: '',
      description: ''
    },
    resolver: zodResolver(formSchema)
  })

  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('division', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status !== 201) {
        throw new Error('Something went wrong')
      }

      toast.success('Division added successfully.')
      router.push('/division')
    } catch (error) {
      const err = error as AxiosErrorResponse

      if (err.response && err.response.data && err.response.data.data) {
        const errorData = err.response.data.data

        if (Array.isArray(errorData)) {
          errorData.forEach(message => toast.error(message))
        } else {
          toast.error(errorData)
        }
      } else {
        toast.error('Failed to add division')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <Grid container spacing={6} m='0' pb='1.5rem' width='100%'>
        <Grid item xs={12} sm={6}>
          <Controller
            name='departmentName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Department Name'
                placeholder='Enter department name'
                {...(errors.departmentName && { error: true, helperText: errors.departmentName.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='departmentName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='Department'
                placeholder='Select department'
                {...(errors.departmentName && { error: true, helperText: errors.departmentName.message })}
              >
                {loadingDepartments ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  departments.map(department => (
                    <MenuItem key={department.departmentName} value={department.departmentName}>
                      {department.departmentName}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Description'
                placeholder='Enter description'
                {...(errors.description && { error: true, helperText: errors.description.message })}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className='flex justify-between px-6'>
        <Button
          variant='tonal'
          startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          color='secondary'
          onClick={() => router.push('/division')}
        >
          Back
        </Button>
        <Button
          disabled={isSubmitting}
          variant='contained'
          type='submit'
          endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          className='w-24'
        >
          {isSubmitting ? <CircularProgress size={20} color='inherit' /> : 'Add'}
        </Button>
      </Grid>
    </form>
  )
}

export default AddDivisionForm

export type DivisionType = {
  _id: string
  divisionId: string
  departmentName: string
  divisionName: string
  description: string
  status: string
  createdAt: Date
}
