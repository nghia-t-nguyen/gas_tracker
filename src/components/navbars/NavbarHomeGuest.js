import './Navbar.css'
import logo from '../../assets/logo/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'

export default function Navbar() {
    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'><img alt='' className='logo' src={logo} /><h2 className='navbar--name'>gas_tracker</h2></div>
                <div className='navbar--buttons-container'><ButtonSecondary title='Sign up' /> <ButtonPrimary title='Sign in' /></div>
            </nav>
        </div>
    )
}