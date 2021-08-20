import React from 'react';
import { List, Card, Row, Col, Typography, Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Баян-Өндөр, Орхон',    
        number: 10000,
        process: 8512,
        done: false    
    },
    {
        title: 'Дархан, Дархан-Уул',
        number: 6000,
        process: 3901,
        done: false
    },
    {
        title: 'Сонгинохойрхон, Улаанбаатар',
        number: 4500,
        process: 2575,
        done: false
    },
    {
        title: 'Зуунмод, Төв',
        number: 11000,
        process: 8848,
        done: false
    },
    {
        title: 'Чойбалсан, Дорнод',
        number: 17000,
        process: 17000,
        done: true
    },
    {
        title: 'Цогтцэций, Өмнөговь',
        number: 14000,
        process: 14000,
        done: true
    }
];

function ProjectList () {
    return (
        <div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 3,
                }}
                pagination={{ pageSize: 6 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card 
                            hoverable
                            title={item.title}
                            extra={<a href="/">Дэлгэрэнгүй</a>}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Typography.Title level={5}>Зорилго</Typography.Title>
                                    <Tag color="green" style={{ fontSize: '14px', padding: '8px' }}>{item.number} мод</Tag>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <Typography.Title level={5}>Төлөв</Typography.Title>
                                    { item.done === true ? (
                                        <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontSize: '14px', padding: '8px' }}>Биелсэн</Tag>
                                    ) : (
                                        <Tag icon={<SyncOutlined />} color="processing" style={{ fontSize: '14px', padding: '8px' }}>{item.process}</Tag>
                                    )}
                                    
                                </Col>
                            </Row>
                            <Typography.Paragraph style={{ marginTop: '16px' }}>
                                Phasellus vitae pretium turpis. Nulla luctus quis eros sed blandit. Etiam vel diam ipsum. Maecenas commodo ultrices tempus. Aenean condimentum est et felis egestas porttitor. Etiam sed dui arcu. Nullam vitae efficitur nulla. Praesent consectetur, purus in ultricies feugiat, leo nulla molestie massa, a pretium augue magna id libero.
                            </Typography.Paragraph>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ProjectList;