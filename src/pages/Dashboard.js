import DashboardGuestState from './DashboardGuestState'
import DashboardSignedInState from './DashboardSignedInState'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../provider/Authentication'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const displayFixingMessage = false;
    const { currentUser, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // useEffect ensures that the component is mounted before the navigation is complete.
    // otherwise it would mount the component without navigating
    useEffect(() => {
        const handleSignOutUserAndDashboard = () => {
            signOutUser()
            navigate('/dashboard')
        }

        if (displayFixingMessage) {
            handleSignOutUserAndDashboard()
        }
        if (currentUser && !currentUser.emailVerified) {
            navigate('/sign-up/verify');
        }
    }, [currentUser, navigate, displayFixingMessage, signOutUser]);


    if (displayFixingMessage) {
        return <h1>Apologizes :/ this site is undergoing some changes due to BitQuery's pricing changes, please return at a later date...</h1>
    } else {
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
}
