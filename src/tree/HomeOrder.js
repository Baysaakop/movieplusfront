import React from 'react';
import { Button, Col, Divider, InputNumber, Radio, Row, Typography } from 'antd';
import { GifOutlined, GiftOutlined, GoldOutlined } from '@ant-design/icons';

function HomeOrder () {
    
    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <div>                        
            <Typography.Title level={2}>TREE+</Typography.Title>
            <Typography.Title level={4}>Алсаас мод тарих боломж бүхий Монголын анхны веб платформд тавтай морилно уу!</Typography.Title>                                    
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Button block icon={<GoldOutlined />} size="large" shape="round" type="primary" style={{ background: 'green', border: '1px solid #f1f1f1' }}>ТАРИХ</Button>                 
                </Col>
                <Col span={12}>
                    <Button block icon={<GiftOutlined />} size="large" shape="round" type="primary" style={{ background: 'darkgreen', border: '1px solid #f1f1f1' }}>БЭЛЭГЛЭХ</Button>                 
                </Col>
            </Row>            
        </div>
    )
}

export default HomeOrder;