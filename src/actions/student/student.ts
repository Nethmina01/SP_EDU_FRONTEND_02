import axios from '@/utils/axios'

// export const createFeature = async (name: string, system_id: number, token: string) => {
//   try {
//     const response = await axios.post(
//       '/feature',
//       {
//         name,
//         code: name.toUpperCase().replace(/\s/g, '_'),
//         system_id,
//         status: true
//       },
//       {
//         headers: {
//           'x-access-token': `Bearer ${token}`
//         }
//       }
//     )

//     if (response.data.status === 'SUCCESS') {
//       return true
//     } else {
//       return false
//     }
//   } catch (error) {
//     console.log(error)

//     return false
//   }
// }

export const getStudents = async () => {
  try {
    const response = await axios.get('student')

    if (response.status === 200) {
      return response.data.data
    } else {
      return []
    }
  } catch (error) {
    console.log(error)

    return []
  }
}

export const getStudentsById = async (id: string) => {
  try {
    const response = await axios.get(`student/${id}`)

    if (response.status === 200) {
      return response.data.data
    } else {
      return []
    }
  } catch (error) {
    console.log(error)

    return []
  }
}
