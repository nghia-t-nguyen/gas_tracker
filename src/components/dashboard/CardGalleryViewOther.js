import './CardGalleryView.css'
import { coins, available } from '../../data/data'

export default function CardGalleryViewOther(props) {
    return (
        <div className='card-gallery-view'>
            {available.filter(x => !props.watchlist.includes(x)).map(key => coins[key])
                .map(x => <CardGalleryStateOther addCard={props.addCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardGalleryStateOther(props) {
    return (
        <div className='card--gallery-state'>
            <div className='card--topline-container'>
                <h2>{props.data.name}</h2>
                <div
                    onClick={() => props.addCard(props.symbol)}
                    title='remove from watchlist' className='card--plus'>
                    <span className='card--plus--span'>+</span>
                </div>
            </div>
            <div className='card--graph-gallery'>placeholder for graph</div>
            <a className='card--more-details' href=''>see more details</a>
        </div>
    )
}