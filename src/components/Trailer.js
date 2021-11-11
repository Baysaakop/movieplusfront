import { Modal } from "antd"
import './Trailer.css'

function Trailer (props) {

    function getWidth() {
        if (window.screen.availWidth >= 1600) {
            return window.screen.availWidth * 0.6
        } else if (window.screen.availWidth >= 1200) {
            return window.screen.availWidth * 0.76
        } else if (window.screen.availWidth >= 992) {
            return window.screen.availWidth - 48
        } else {
            return window.screen.availWidth - 32
        }
    }

    function getHeight() {
        if (window.screen.availWidth >= 1200) {
            return window.screen.availWidth * 0.35
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 48) * 0.5
        } else {
            return (window.screen.availWidth - 32) * 0.6
        }
    }

    return (
        <div>
            <Modal 
                className="trailer"
                centered                                                                                                                                 
                visible={true}
                footer={null}                    
                onCancel={() => props.hide()}                                                      
                width={getWidth()}
                style={{ padding: 0 }}
            >                                                   
                <div>
                    <iframe title={props.title} width="100%" height={getHeight()} src={props.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                                                
                </div> 
            </Modal>
        </div>
    )
}

export default Trailer