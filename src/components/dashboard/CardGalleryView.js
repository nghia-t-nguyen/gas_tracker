import './CardGalleryView.css'
import { coins } from '../../database_testing/data'

export default function CardGalleryView() {
    return (
        <div className='card-gallery-view'>
            {coins.map(x => <CardGalleryState data={x} />)}
        </div>
    )
}

function CardGalleryState(props) {
    return (
        <div className='card--gallery-state'>
            <div className='card--topline-container'>
                <h2>{props.data.name}</h2>
                <div title='remove from watchlist' className='card--minus'><span className='card--minus--span'>-</span></div>
            </div>
            <div className='card--graph-gallery'>placeholder for graph</div>
            <a className='card--more-details' href=''>see more details</a>
        </div>
    )
}