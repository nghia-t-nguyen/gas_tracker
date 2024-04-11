import './AccountSettings.css'
import Navbar from '../components/navbars/NavbarAccountSettings'
import ButtonSecondary from '../components/buttons/ButtonSecondary'
import ButtonPrimary from '../components/buttons/ButtonPrimary'

export default function AccountSettings() {
    return (
        <div className='account-settings--max-width'>
            <Navbar />
            <div className='account-settings--action-item'>
                <h2>Delete Account</h2>
                <ButtonSecondary name='Delete Account' />
            </div>
        </div>
    )
}