import './ButtonPrimary.css'
import googleLogo from '../../assets/icons/google_icon.svg'

export default function ButtonPrimaryGoogle(props) {
    return (
        <button className='button--primary'>
            <img
                alt='google logo'
                src={googleLogo}
                style={{ height: '1.25rem', marginRight: '6px' }} />
            <h3 className='button--primary-title'>{props.title}</h3>
        </button>
    )
}