import React from 'react';
import { Button, Col, Divider, InputNumber, Radio, Row, Typography } from 'antd';

function TreeCountOrder () {
    
    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <div>                        
            <Typography.Title level={3}>#МОД ТАРЬЦГААЯ</Typography.Title>
            <Typography.Title level={5}>2000 төгрөг = 1 мод</Typography.Title>
            <Radio.Group onChange={onChange} defaultValue="1" style={{ width: '100%' }} size="large">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Radio.Button shape="rounded" value="1" style={{ width: '100%' }}>5 мод</Radio.Button>
                    </Col>
                    <Col span={12}>
                        <Radio.Button value="2" style={{ width: '100%' }}>20 мод</Radio.Button>
                    </Col>
                    <Col span={12}>
                        <Radio.Button value="3" style={{ width: '100%' }}>50 мод</Radio.Button>
                    </Col>
                    <Col span={12}>
                        <Radio.Button value="4" style={{ width: '100%' }}>100 мод</Radio.Button>
                    </Col>
                </Row>
            </Radio.Group>
            <InputNumber size="large" min={1} max={100000} placeholder="Өөр дүн оруулах" style={{ width: '100%', marginTop: '16px' }} />
            <Divider />
            <Button size="large" shape="round" type="primary" style={{ background: 'green', border: '1px solid #f1f1f1' }} block>Үргэжлүүлэх</Button>                 
        </div>
    )
}

export default TreeCountOrder;