import './Dashboard.css';
import Navbar from '../components/navbars/NavbarDashboard';
import CardGalleryView from '../components/dashboard/CardGalleryView';
import CardLinearView from '../components/dashboard/CardLinearView';
import galleryViewIcon from '../assets/icons/gallery_view_icon.svg';
import listViewIcon from '../assets/icons/list_view_icon.svg';
import { useState } from 'react';

export default function Dashboard() {
    const [watchlistGalleryView, setWatchlistGalleryView] = useState(true);
    const [otherCryptoGalleryView, setOtherCryptoGalleryView] = useState(false);


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

            {watchlistGalleryView ? <CardGalleryView /> : <CardLinearView />}


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

            {otherCryptoGalleryView ? <CardGalleryView /> : <CardLinearView />}
        </div>
    )
}