import { Col, Row, Typography } from "antd";

function FilmPopover (props) {
    return (
        <div className="popover-container" style={{ width: '240px' }}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <img alt={props.film.name} src={props.film.poster} style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col span={12}>
                    <Typography.Text style={{ fontWeight: 'bold' }}>{props.film.title}</Typography.Text>       
                    <br />
                    <Typography.Paragraph ellipsis={{ rows: 6 }}>{props.film.description}</Typography.Paragraph>             
                </Col>
            </Row>
        </div>
    )
}

export default FilmPopover