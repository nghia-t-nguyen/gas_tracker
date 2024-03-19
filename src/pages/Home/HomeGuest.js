import ButtonPrimary from '../../components/buttons/ButtonPrimary'
import ButtonSecondary from '../../components/buttons/ButtonSecondary'
import HeroCubeEdges from '../../assets/hero/hero-cube-edges.svg'
import HeroCube1 from '../../assets/hero/hero-cube-1.svg'
import HeroCube2 from '../../assets/hero/hero-cube-2.svg'
import HeroCube3 from '../../assets/hero/hero-cube-3.svg'
import HeroCube4 from '../../assets/hero/hero-cube-4.svg'
import HeroCube5 from '../../assets/hero/hero-cube-5.svg'
import HeroCube6 from '../../assets/hero/hero-cube-6.svg'
import HeroCube7 from '../../assets/hero/hero-cube-7.svg'
import './HomeGuest.css'
import Navbar from '../../components/navbars/NavbarHomeGuest'

export default function Home() {
    return (
        <div className="content--max-width">
            <Navbar />
            <section className='home--hero'>
                <div className='home--hero-image-container'>
                    <div className='home--hero-image-cube-edges' style={{ backgroundImage: `url(${HeroCubeEdges})` }}>
                        <div className='home--hero-image-button-1'></div>
                        <div className='home--hero-image-cube-1' style={{ backgroundImage: `url(${HeroCube1})` }}></div>
                        <div className='home--hero-image-button-2'></div>
                        <div className='home--hero-image-cube-2' style={{ backgroundImage: `url(${HeroCube2})` }}></div>
                        <div className='home--hero-image-button-3'></div>
                        <div className='home--hero-image-cube-3' style={{ backgroundImage: `url(${HeroCube3})` }}></div>
                        <div className='home--hero-image-button-4'></div>
                        <div className='home--hero-image-cube-4' style={{ backgroundImage: `url(${HeroCube4})` }}></div>
                        <div className='home--hero-image-button-5'></div>
                        <div className='home--hero-image-cube-5' style={{ backgroundImage: `url(${HeroCube5})` }}></div>
                        <div className='home--hero-image-button-6'></div>
                        <div className='home--hero-image-cube-6' style={{ backgroundImage: `url(${HeroCube6})` }}></div>
                        <div className='home--hero-image-button-7'></div>
                        <div className='home--hero-image-cube-7' style={{ backgroundImage: `url(${HeroCube7})` }}></div>
                    </div>

                </div>
                <div className='home--hero-text-flex'>
                    <div className='home--hero-text-container'>
                        <h1>Stay at the top of your game with <span>gas_tracker</span></h1>
                        <p><b>gas_tracker</b> helps users track gas, a.k.a. the computational work required to perform transactions on a blockchain network</p>
                        <div>
                            <p className='home--hero-text-button-one'><ButtonPrimary title='Sign up' /> or</p>
                            <ButtonSecondary title='Try without signing up' />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}