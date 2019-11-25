import Dashboard from './../components/DashBoard'
import Contact from './../components/Contact'
import Profile from './../components/Profile'
import Login from './../components/Login'
import Register from './../components/Register'
import ForgotPassword from './../components/ForgotPassword'
import Logout from './../components/Logout'
export default [
    {   path: '/',
        name: 'login',
        component: Login,
        meta: {
        requiresVisitor: true,
      }
    },
    {   path: '/register',
        name: 'register', component: Register,
        meta: {
        requiresVisitor: true,
      }
    },
    {   path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            requiresVisitor: true,
          }
    },
    {   path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
      }
 ];
