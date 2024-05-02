import './AccountSettings.css'
import { useState, useContext, useEffect } from 'react'
import Navbar from '../components/navbars/NavbarAccountSettings'
import ButtonSecondary from '../components/buttons/ButtonSecondary'
import ActionPopup from '../components/other/ActionPopup'
import { AuthContext } from '../provider/Authentication'
import { useNavigate } from 'react-router-dom'

export default function AccountSettings() {
    const [deleteAccountActionVisibility, setDeleteAccountActionVisibility] = useState(false);

    const navigate = useNavigate();
    const { deleteUserAccount, currentUser, signOutUser } = useContext(AuthContext);

    // useEffect ensures that the component is mounted before the navigation is complete.
    // otherwise it would mount the component without navigating
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className='account-settings--max-width'>
            <Navbar />
            <ActionPopup
                heading='Are you sure you want to delete your account?'
                subtitle='Deleting your account would be permanent.'
                isVisible={deleteAccountActionVisibility}
                handleCancel={() => setDeleteAccountActionVisibility(false)}
                handleAction={() => deleteUserAccount()}
            />
            <div className='account-settings--action-item'>
                <h2>Delete Account</h2>
                <div className='button-container'>
                    <ButtonSecondary
                        name='Delete Account'
                        handleClick={() => { setDeleteAccountActionVisibility(true) }}
                    />
                </div>
            </div>
        </div>
    )
}