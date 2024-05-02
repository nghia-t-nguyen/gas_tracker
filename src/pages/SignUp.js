import './SignUp.css'
import Navbar from '../components/navbars/NavbarSignUp'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import ButtonPrimaryGoogle from '../components/buttons/ButtonPrimaryGoogle';
import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/Authentication';
import Message from '../components/other/Message'
import DisplayForTenSeconds from '../functions/displayForTenSeconds';

export default function SignUp() {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [message, setMessage] = useState('')
    const divRef = useRef(null);

    const handleMouseMove = (event) => {
        const rect = divRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCoordinates({ x, y });
    };

    const showPopup = (text) => {
        setShowComponent(true);
        setTimeout(() => {
            setShowComponent(false);
        }, 10000); // 10 seconds
        setMessage(text)
    };

    return (
        <div className="signup-content--max-width">
            <Navbar />
            {showComponent &&
                <DisplayForTenSeconds component={
                    <Message text={message} />} />
            }
            <div className='signup-form--container'>
                <div className='signup-form--clipped-circle'
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
                    <div className='signup-form'>
                        <SignUpForm handlePopup={showPopup} />
                    </div>
                </div>
            </div>
        </div>
    )
}


// separate component for more efficiency since the fields update on each keystroke
function SignUpForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();
    const { currentUser, signUpUser, signInWithGoogle } = useContext(AuthContext);
    if (currentUser && currentUser.emailVerified) {
        navigate('/dashboard')
    }

    const handleSignUp = async () => {
        if (/^\s*$/.test(email)) {
            props.handlePopup('Email must not be empty.')
        } else if (password !== passwordConfirm) {
            props.handlePopup('Passwords must match')
        } else if (!passwordIsValid(password, passwordConfirm)) {
            props.handlePopup('Password must have a minimum of eight characters, at least one letter, one number and one special character.')
        } else {
            try {
                await signUpUser(email, password)
                navigate('/sign-up/verify')
            } catch (errorCode) {
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        props.handlePopup('Email is already in use.');
                        break;
                    case 'auth/invalid-email':
                        props.handlePopup('Email is invalid.')
                        break;
                    case 'auth/network-request-failed':
                        props.handlePopup('A network error has occurred. Try again later.')
                        break;
                    case 'auth/user-disabled':
                        props.handlePopup('User is disabled.')
                        break;
                }
            }
        }
    }

    return (
        <div className='signup-form--inner-container'>
            <h1>Welcome to <span>gas_tracker</span></h1>
            <p>sign up with email</p>
            <input className="sign-up-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="sign-up-form--input" type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input className="sign-up-form--input" type='password' placeholder="confirm password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
            <ButtonPrimary name='Continue' handleClick={handleSignUp} />
            <div className='sign-up-form--or-container'>
                <div className='sign-up-form--or-left-div'></div>
                <div>
                    <p className='sign-up-form--or'>or</p>
                </div>
                <div className='sign-up-form--or-right-div'></div>
            </div>
            <ButtonPrimaryGoogle name='Sign up with Google' handleClick={signInWithGoogle} />
        </div>
    )
}

function passwordIsValid(password1, password2) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password1) && (password1 === password2);
}