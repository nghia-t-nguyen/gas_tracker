import './ForgotPassword.css'
import Navbar from '../components/navbars/NavbarSignIn'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useRef, useState, useEffect } from 'react';
import Message from '../components/other/Message'
import DisplayForThreeSeconds from '../functions/displayForThreeSeconds';

export default function ForgotPassword() {
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
        }, 5000); // 5 seconds
    };

    return (
        <div className="forgot-password-content--max-width">
            <Navbar />
            {showComponent && <DisplayForThreeSeconds component={<Message text='You should receive a password change email if your email address is valid.' />} />}
            <div className='forgot-password-form--container'>
                <div className='forgot-password-form--clipped-circle'
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
                    <div className='forgot-password-form'>
                        <ForgotPasswordForm handlePopup={showPopup} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ForgotPasswordForm(props) {
    const [email, setEmail] = useState('');

    const submitEmail = () => {
        props.handlePopup()
    }

    return (
        <div className='forgot-password-form--inner-container'>
            <h1>Forgot your password?</h1>
            <p>Enter in your email to reset your password.</p>
            <input className="forgot-password-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <ButtonPrimary name='Send email password reset' handleClick={submitEmail} />
        </div>
    )
}