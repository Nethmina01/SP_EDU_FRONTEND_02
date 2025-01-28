'use client'

import type { SetStateAction } from 'react'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'


import axios from '@/utils/axios'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@/components/DirectionalIcon'
import { getDepartments } from '@/actions/department/department'

type AxiosErrorResponse = {
  response?: {
    data?: {
      data?: string
    }
  }
}

// Define the UserType
export type UserType = {
  userId: string
  firstName: string
  lastName: string
  email: string
  userRole: string
  mobileNumber: string
  alternativeNumber?: string
  currentAddress: string
  permanentAddress: string
  nic: string
  dob: string
  gender: string
  maritalStatus: string
  departmentId: string
  divisionId: string
}

// Define the form schema using zod
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name should be more than 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last name should be more than 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  userRole: z.string().min(2, { message: 'User role should be more than 2 characters long' }),
  mobileNumber: z.string().min(10, { message: 'Mobile number should be at least 10 digits long' }),
  alternativeNumber: z.string().optional(),
  currentAddress: z.string().min(2, { message: 'Current address should be more than 2 characters long' }),
  permanentAddress: z.string().min(2, { message: 'Permanent address should be more than 2 characters long' }),
  nic: z.string().min(10, { message: 'NIC should be at least 10 characters long' }),
  dob: z.string().min(10, { message: 'Date of birth is required' }),
  gender: z.string().min(2, { message: 'Gender is required' }),
  maritalStatus: z.string().min(2, { message: 'Marital status is required' }),
  departmentId: z.string().min(2, { message: 'Department ID is required' }),
  divisionId: z.string().min(2, { message: 'Division ID is required' })
})

const AddUserForm: React.FC = () => {
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
  } = useForm<UserType>({
    defaultValues: {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      userRole: '',
      mobileNumber: '',
      alternativeNumber: '',
      currentAddress: '',
      permanentAddress: '',
      nic: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      departmentId: '',
      divisionId: ''
    },
    resolver: zodResolver(formSchema)
  })

  const router = useRouter()

  const onSubmit = async (data: UserType) => {
    try {
      const response = await axios.post('/user', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status !== 201) {
        toast.error(response.data.message || 'Something went wrong')
        throw new Error('Something went wrong')
      }

      toast.success('User added successfully.')
      router.push('/user-management')
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
        toast.error('Failed to add department')
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <Grid container spacing={6} m='0' pb='1.5rem' width='100%'>
          <Grid item xs={12} sm={6}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='First Name'
                  placeholder='Enter first name'
                  {...(errors.firstName && { error: true, helperText: errors.firstName.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Last Name'
                  placeholder='Enter last name'
                  {...(errors.lastName && { error: true, helperText: errors.lastName.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='gender'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label='Gender'
                  placeholder='Select gender'
                  {...(errors.gender && { error: true, helperText: errors.gender.message })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Email'
                  placeholder='Enter email'
                  {...(errors.email && { error: true, helperText: errors.email.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='userRole'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label='User Role'
                  placeholder='Select User Role'
                  {...(errors.userRole && { error: true, helperText: errors.userRole.message })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='Admin'>Admin</MenuItem>
                  <MenuItem value='Super Admin'>Super Admin</MenuItem>
                  <MenuItem value='User'>User</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='mobileNumber'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Mobile Number'
                  placeholder='Enter mobile number'
                  {...(errors.mobileNumber && { error: true, helperText: errors.mobileNumber.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='alternativeNumber'
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Alternative Number'
                  placeholder='Enter alternative number'
                  {...(errors.alternativeNumber && { error: true, helperText: errors.alternativeNumber?.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='currentAddress'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Current Address'
                  placeholder='Enter current address'
                  {...(errors.currentAddress && { error: true, helperText: errors.currentAddress.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='permanentAddress'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Permanent Address'
                  placeholder='Enter permanent address'
                  {...(errors.permanentAddress && { error: true, helperText: errors.permanentAddress.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='nic'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='NIC'
                  placeholder='Enter NIC'
                  {...(errors.nic && { error: true, helperText: errors.nic.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='dob'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='date'
                  label='Date of Birth'
                  {...(errors.dob && { error: true, helperText: errors.dob.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='maritalStatus'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label='Marital Status'
                  placeholder='Select Marital Status'
                  {...(errors.maritalStatus && { error: true, helperText: errors.maritalStatus.message })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='single'>Single</MenuItem>
                  <MenuItem value='married'>Married</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='departmentId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label='Department'
                  placeholder='Select department'
                  {...(errors.departmentId && { error: true, helperText: errors.departmentId.message })}
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
              name='divisionId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Division'
                  placeholder='Enter division ID'
                  {...(errors.divisionId && { error: true, helperText: errors.divisionId.message })}
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
            onClick={() => router.push('/user-management')}
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
    </>
  )
}

export default AddUserForm
