import './ButtonSecondary.css'

export default function ButtonSecondary(props) {
    return (
        <button className='button--secondary'>
            <h3 className='button--secondary-title'>{props.name}</h3>
        </button>
    )
}