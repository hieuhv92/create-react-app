import VideoHomePage from '../../assets/video-homepage.mp4'

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div>HomePage Component</div>
            <video loop autoPlay muted>
                <source src={VideoHomePage} type="video/mp4" />
            </video>
        </div>
    )

}

export default HomePage;