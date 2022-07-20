import useToast from 'hooks/useToast'
import authService from 'services/auth-service'
import baseService from 'services/base-service'

const Dashboard = () => {
  const { errorToast } = useToast()
  const getProfile = async () => {
    try {
      const res = await baseService.get('/profile')
      console.log(res);
    } catch (err: any) {
      const { error } = err.response.data
      errorToast(error)
      authService.terminateLocalSession()
    }
  }
  return <div onClick={getProfile}>Dashboard</div>
}

export default Dashboard
