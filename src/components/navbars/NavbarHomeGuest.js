import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'
import { useNavigate } from "react-router-dom";

export default function NavbarHomeGuest() {
    const navigate = useNavigate();
    const goToSignIn = () => {
        let path = `sign-in`;
        navigate(path);
    }
    const goToSignUp = () => {
        let path = 'sign-up'
        navigate(path);
    }

    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'><img alt='' className='logo' src={logo} /><h2 className='navbar--name'>gas_tracker</h2></div>
                <div className='navbar--buttons-container'>
                    <ButtonSecondary name='Sign up' handleClick={goToSignUp} />
                    <ButtonPrimary name='Sign in' handleClick={goToSignIn} />
                </div>
            </nav>
        </div>
    )
}