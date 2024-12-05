import './App.css'
// import { Header } from './components'
import DashboardLayout from './components/layout.tsx/DashboardLayout'
import RoleList from './components/roles/RolesList'
import UserList from './components/user/users'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <>
     <AppProvider>
      <DashboardLayout>
        <div className="space-y-8">
          <UserList />
          <RoleList />
        </div>
      </DashboardLayout>
    </AppProvider>
    </>
  )
}

export default App
