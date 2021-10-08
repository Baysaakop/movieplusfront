import { Col, Row, Typography } from "antd";

function FilmPopover (props) {
    return (
        <div className="popover-container" style={{ width: '300px' }}>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <img alt={props.film.name} src={props.film.poster} style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col span={16}>
                    <Typography.Text style={{ fontWeight: 'bold' }}>{props.film.title}</Typography.Text>       
                    <br />
                    <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 6 }}>{props.film.plot}</Typography.Paragraph>             
                </Col>
            </Row>
        </div>
    )
}

export default FilmPopover