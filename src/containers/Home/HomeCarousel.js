import { Carousel, Typography } from "antd";

function HomeCarousel (props) {
    return (
        <div>
            <Carousel autoplay effect="fade">
                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff' }}>NEWS 1</Typography.Title>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff' }}>NEWS 2</Typography.Title>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff' }}>NEWS 3</Typography.Title>
                        </div>
                    </div>
                </div>  
                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff' }}>NEWS 4</Typography.Title>
                        </div>
                    </div>
                </div>  
                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff' }}>NEWS 5</Typography.Title>
                        </div>
                    </div>
                </div>  
            </Carousel>
        </div>
    )
}

export default HomeCarousel