import './Dashboard.css'
import Navbar from '../components/navbars/NavbarSignIn'
import CardGalleryViewWatchlist from '../components/dashboard/CardGalleryViewWatchlist'
import CardLinearViewWatchlist from '../components/dashboard/CardLinearViewWatchlist'
import CardGalleryViewOther from '../components/dashboard/CardGalleryViewOther'
import CardLinearViewOther from '../components/dashboard/CardLinearViewOther'
import galleryViewIcon from '../assets/icons/gallery_view_icon.svg'
import listViewIcon from '../assets/icons/list_view_icon.svg'
import { useState } from 'react';
import { watchlist } from '../database_testing/data'

export default function DashboardGuestState() {
    const [watchlistGalleryView, setWatchlistGalleryView] = useState(true);
    const [otherCryptoGalleryView, setOtherCryptoGalleryView] = useState(false);
    const [watchlistState, setWatchlistState] = useState(watchlist);

    const removeFromWatchlist = (tickerSymbol) => {
        setWatchlistState(watchlistState.filter(x => x !== tickerSymbol));
        console.log(tickerSymbol);
    }

    const addToWatchlist = (tickerSymbol) => {
        setWatchlistState((prevList) => {
            const newList = [...prevList, tickerSymbol].sort();
            return newList;
        });
    }

    return (
        <div className='dashboard-content--max-width'>
            <Navbar />
            <div className='dashboard--section'>
                <h1>Watchlist</h1>
                <div className='dashboard--view-button'
                    title='toggle view'
                    onClick={() => setWatchlistGalleryView(prevState => !prevState)}>
                    <img alt='' className='dashboard--view-button-img'
                        src={watchlistGalleryView ? galleryViewIcon : listViewIcon} />
                    <span className='dashboard--view-button-text'>
                        view
                    </span>
                </div>
            </div>

            {watchlistGalleryView ? <CardGalleryViewWatchlist removeCard={removeFromWatchlist} watchlist={watchlistState} /> :
                <CardLinearViewWatchlist removeCard={removeFromWatchlist} watchlist={watchlistState} />}


            <div className='dashboard--section'>
                <h1>Other Available Cryptocurrencies</h1>
                <div className='dashboard--view-button'
                    title='toggle view'
                    onClick={() => setOtherCryptoGalleryView(prevState => !prevState)}>
                    <img alt='' className='dashboard--view-button-img'
                        src={otherCryptoGalleryView ? galleryViewIcon : listViewIcon} />
                    <span className='dashboard--view-button-text'>
                        view
                    </span>
                </div>
            </div>

            {otherCryptoGalleryView ? <CardGalleryViewOther addCard={addToWatchlist} watchlist={watchlistState} /> :
                <CardLinearViewOther addCard={addToWatchlist} watchlist={watchlistState} />}
        </div>
    )
}