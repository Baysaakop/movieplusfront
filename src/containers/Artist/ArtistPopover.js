import { Col, Row, Typography } from "antd";

function ArtistPopover (props) {
    return (
        <div className="popover-container" style={{ width: '300px' }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <img alt={props.artist.name} src={props.artist.avatar} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                </Col>
                <Col span={16}>
                    <Typography.Text style={{ fontWeight: 'bold' }}>{props.artist.name}</Typography.Text>
                    <br />
                    <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 6 }}>
                        {props.artist.biography}
                    </Typography.Paragraph>
                </Col>
            </Row>
        </div>
    )
}

export default ArtistPopover