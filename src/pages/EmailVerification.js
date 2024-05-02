import './EmailVerification.css'
import Navbar from '../components/navbars/NavbarSignUp'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useRef, useState, useContext } from 'react';
import { AuthContext } from '../provider/Authentication';
import { useNavigate } from 'react-router-dom';
import Message from '../components/other/Message'
import DisplayForTenSeconds from '../functions/displayForTenSeconds';

export default function EmailVerification() {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const divRef = useRef(null);

    const handleMouseMove = (event) => {
        const rect = divRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCoordinates({ x, y });
    };

    const showPopup = () => {
        setShowComponent(true);
        setTimeout(() => {
            setShowComponent(false);
        }, 10000); // 10 seconds
    };

    return (
        <div className="email-verification-content--max-width">
            <Navbar />
            {showComponent &&
                <DisplayForTenSeconds component={
                    <Message text='Email not verified. Try again.' />} />
            }
            <div className='email-verification-form--container'>
                <div className='email-verification-form--clipped-circle'
                    ref={divRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => { setIsVisible(true) }}
                    onMouseLeave={() => { setIsVisible(false) }}>
                    <div className='circle'
                        style={{
                            left: coordinates.x,
                            top: coordinates.y,
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}>
                    </div>
                    <div className='email-verification-form'>
                        <EmailVerificationForm handlePopup={showPopup} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmailVerificationForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { currentUser, signInUser, signOutUser, resendVerificationEmail } = useContext(AuthContext);

    const handleSignIn = () => {
        signInUser(email, password)
    }

    if (currentUser) {
        if (currentUser.emailVerified) {
            navigate('/dashboard')
        } else {
            signOutUser();
            props.handlePopup();
        }
    }

    return (
        <div className='email-verification-form--inner-container'>
            <h1 className='email-verification-h1'>An email verification has been sent.</h1>
            <p>Verify email before signing in.</p>
            <input className="email-verification-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="email-verification-form--input" type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className='resend-email--container'><span className='resend-email--anchor' onClick={resendVerificationEmail}>Didn't receive an email? Click here to resend email.</span></div>
            <ButtonPrimary name='Sign in' handleClick={handleSignIn} />
        </div>
    )
}