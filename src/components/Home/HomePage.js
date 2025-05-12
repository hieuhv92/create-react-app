import VideoHomePage from '../../assets/video-homepage.mp4'

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div>HomePage Component</div>
            <div className='homepage-content'>
                <div className='title-1'> There's a better way to ask</div>
                <div className='title-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                <div className='title-3'>
                    <button>Get's started.It's free</button>
                </div>
            </div>
            <video loop autoPlay muted>
                <source src={VideoHomePage} type="video/mp4" />
            </video>
        </div>
    )

}

export default HomePage;