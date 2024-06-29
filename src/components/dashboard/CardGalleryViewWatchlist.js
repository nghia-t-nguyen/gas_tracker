import './CardGalleryView.css'
import { coins, coins2 } from '../../database_testing/data'

export default function CardGalleryViewWatchlist(props) {
    return (
        <div className='card-gallery-view'>
            {props.watchlist.map(key => coins2[key]).map(x => <CardGalleryStateWatchlist removeCard={props.removeCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardGalleryStateWatchlist(props) {
    return (
        <div className='card--gallery-state'>
            <div className='card--topline-container'>
                <h2>{props.data.name}</h2>
                <div
                    onClick={() => props.removeCard(props.symbol)}
                    title='remove from watchlist' className='card--minus'><span className='card--minus--span'>-</span></div>
            </div>
            <div className='card--graph-gallery'>placeholder for graph</div>
            <a className='card--more-details' href=''>see more details</a>
        </div>
    )
}