import './Navbar.css'
import logo from '../../assets/logo/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'

export default function NavbarSignIn() {
    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <a href='../'><div className='flexbox--vertical-center'><img alt='' className='logo' src={logo} /><h2 className='navbar--name'>gas_tracker</h2></div></a>
                <div className='navbar--buttons-container'><h3>Don't have an account?</h3> <ButtonPrimary title='Sign up' /></div>
            </nav>
        </div>
    )
}