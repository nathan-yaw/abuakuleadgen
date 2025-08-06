// utils/api.ts (or similar)
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Your Django API base URL
  withCredentials: true, // Important for CSRF cookie
})

// Function to get and set CSRF token
export const getCsrfToken = async () => {
  try {
    const response = await api.post('/api/auth/register')
    return response.data.csrfToken
  } catch (error) {
    console.error('Error fetching CSRF token:', error)
    throw error
  }
}


export default api