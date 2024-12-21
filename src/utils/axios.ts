import axios from 'axios'

import { API_URL } from '@/configs/apiUrl'

const axiosService = axios.create({
  baseURL: API_URL,
  timeout: 100000
})

export default axiosService
