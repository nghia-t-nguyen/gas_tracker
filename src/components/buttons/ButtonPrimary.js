import './ButtonPrimary.css'

export default function ButtonPrimary(props) {
    return (
        <button onClick={props.handleClick} className='button--primary'>
            <h3 className='button--primary-title'>{props.name}</h3>
        </button>
    )
}