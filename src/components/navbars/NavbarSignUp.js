import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useNavigate } from 'react-router-dom'

export default function NavbarSignUp() {
    const navigate = useNavigate();

    const goToSignIn = () => {
        let path = '/sign-in'
        navigate(path);
    }

    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <a href='/'><div className='flexbox--vertical-center'><img alt='' className='logo' src={logo} /><h2 className='navbar--name'>gas_tracker</h2></div></a>
                <div className='navbar--buttons-container'><h3>Already have an account?</h3> <ButtonPrimary name='Sign in' handleClick={goToSignIn} /></div>
            </nav>
        </div>
    )
}