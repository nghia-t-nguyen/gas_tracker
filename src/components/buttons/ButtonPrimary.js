import './ButtonPrimary.css'

export default function ButtonPrimary(props) {
    return (
        <button className='button--primary'>
            <h3 className='button--primary-title'>{props.title}</h3>
        </button>
    )
}