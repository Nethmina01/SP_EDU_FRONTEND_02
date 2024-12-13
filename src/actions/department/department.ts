import axios from '@/utils/axios'

export const getDepartments = async () => {
  try {
    const response = await axios.get('department')

    console.log(response)

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
