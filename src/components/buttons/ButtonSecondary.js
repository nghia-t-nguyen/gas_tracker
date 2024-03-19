import './ButtonSecondary.css'

export default function ButtonSecondary(props) {
    return (
        <button className='button--secondary'>
            <h3 className='button--secondary-title'>{props.title}</h3>
        </button>
    )
}