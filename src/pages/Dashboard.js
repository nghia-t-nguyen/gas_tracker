import DashboardGuestState from './DashboardGuestState'
import DashboardSignedInState from './DashboardSignedInState'
import { useContext } from 'react'
import { AuthContext } from '../provider/Authentication'

export default function Dashboard() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <DashboardSignedInState />
    } else {
        return <DashboardGuestState />
    }
}