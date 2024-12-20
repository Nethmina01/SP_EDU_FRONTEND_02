export type UserType = {
  userId: string

  firstName: string

  lastName: string

  email: string

  password: string

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

  status: string

  createAt: Date

  updatedAt: Date

  deletedAt?: Date
}
