import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import { AppRoutings } from 'utility/enums/app-routings'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicRoute from 'components/PublicRoute'
import Dashboard from 'pages/Dashboard'
import ProtectedRoute from 'components/ProtectedRoute'
import Layout from 'components/Layout'

const RoutesList = [
  {
    path: AppRoutings.SignIn,
    component: <SignIn />,
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.SignUp,
    component: <SignUp />,
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.Dashboard,
    component: <Dashboard />,
    isProtectedRoute: true,
  },
]

const AllRoutes = () => {
  return (
    <Layout>
      <Routes>
        {RoutesList.filter((route) => !route.isProtectedRoute).map(
          ({ path, component }, key) => {
            return (
              <Route
                key={key}
                path={path}
                element={<PublicRoute>{component}</PublicRoute>}
              />
            )
          }
        )}
        {RoutesList.filter((route) => !!route.isProtectedRoute).map(
          ({ path, component }, key) => {
            return (
              <Route
                key={key}
                path={path}
                element={<ProtectedRoute>{component}</ProtectedRoute>}
              />
            )
          }
        )}
        <Route
          path="*"
          element={<Navigate replace to={AppRoutings.SignIn} />}
        />
      </Routes>
    </Layout>
  )
}

export default AllRoutes
