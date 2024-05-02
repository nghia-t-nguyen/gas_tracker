import DashboardGuestState from './DashboardGuestState'
import DashboardSignedInState from './DashboardSignedInState'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../provider/Authentication'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // useEffect ensures that the component is mounted before the navigation is complete.
    // otherwise it would mount the component without navigating
    useEffect(() => {
        if (currentUser && !currentUser.emailVerified) {
            navigate('/sign-up/verify');
        }
    }, [currentUser, navigate]);

    if (currentUser) {
        if (currentUser.emailVerified) {
            return <DashboardSignedInState />;
        } else {
            return null;
        }

    } else {
        return <DashboardGuestState />;
    }
}
