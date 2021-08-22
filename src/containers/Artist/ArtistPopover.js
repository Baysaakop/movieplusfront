import { Col, Row } from "antd";

function ArtistPopover (props) {
    return (
        <div className="popover-container" style={{ width: '200px' }}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <img alt={props.artist.name} src={props.artist.img} style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col span={12}>
                    <strong>{props.artist.name}</strong>
                </Col>
            </Row>
        </div>
    )
}

export default ArtistPopover