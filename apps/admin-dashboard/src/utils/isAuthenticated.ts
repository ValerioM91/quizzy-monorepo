import apiClient from "../api-client"

export const isAuthenticated = async () => {
  try {
    const { status } = await apiClient.authentication.currentUser.query()
    return status === 200
  } catch (error) {
    return false
  }
}
