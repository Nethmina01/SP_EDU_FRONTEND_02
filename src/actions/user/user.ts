import axios from '@/utils/axios'

export const getUsers = async () => {
  try {
    const response = await axios.get('user')

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

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`user/${id}`)

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
