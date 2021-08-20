import { CloudOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Typography } from "antd";

function Idea (props) {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={12} lg={6} style={{ textAlign: 'center' }}>
                <Avatar size={128} icon={<CloudOutlined />} />
                <Typography.Title level={4}>Цаг уурын өөрчлөлт</Typography.Title>
                <Typography.Text>Дэлхийн дулаарлын эсрэг таны эерэг оролцоо бидэнд чухал</Typography.Text>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} style={{ textAlign: 'center' }}>
                <Avatar size={128} icon={<CloudOutlined />} />
                <Typography.Title level={4}>Усны хомсдол</Typography.Title>
                <Typography.Text>Дэлхийн дулаарлын эсрэг таны эерэг оролцоо бидэнд чухал</Typography.Text>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} style={{ textAlign: 'center' }}>
                <Avatar size={128} icon={<CloudOutlined />} />
                <Typography.Title level={4}>Мод тарих</Typography.Title>
                <Typography.Text>Дэлхийн дулаарлын эсрэг таны эерэг оролцоо бидэнд чухал</Typography.Text>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} style={{ textAlign: 'center' }}>
                <Avatar size={128} icon={<CloudOutlined />} />
                <Typography.Title level={4}>Загас үржүүлэг</Typography.Title>
                <Typography.Text>Дэлхийн дулаарлын эсрэг таны эерэг оролцоо бидэнд чухал</Typography.Text>
            </Col>
        </Row>        
    )
}

export default Idea;