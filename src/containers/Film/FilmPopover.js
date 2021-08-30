import { Col, Row, Typography } from "antd";

function FilmPopover (props) {
    return (
        <div className="popover-container" style={{ width: '200px' }}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <img alt={props.film.name} src={props.film.poster} style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col span={12}>
                    <Typography.Title level={5}>{props.film.name}</Typography.Title>       
                    <Typography.Paragraph ellipsis={{ rows: 4 }}>{props.film.description}</Typography.Paragraph>             
                </Col>
            </Row>
        </div>
    )
}

export default FilmPopover