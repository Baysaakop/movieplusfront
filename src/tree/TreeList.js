import { List, Card } from 'antd';
import React from 'react';
import Tree1 from './photos/Tree1.svg';
import Tree2 from './photos/Tree2.svg';
import Tree3 from './photos/Tree3.svg';
import Tree4 from './photos/Tree4.svg';
import Tree5 from './photos/Tree5.svg';
import Tree6 from './photos/Tree6.svg';

const { Meta } = Card;

const data = [
    {
        title: 'Сибирь шинэс',
        image: Tree1,
    },
    {
        title: 'Эгэл нарс',
        image: Tree2,
    },
    {
        title: 'Сибирь хуш',
        image: Tree3,
    },
    {
        title: 'Сибирь гацуур',
        image: Tree4,
    },
    {
        title: 'Сибирь жодоо',
        image: Tree5,
    },
    {
        title: 'Хус',
        image: Tree6,
    },
    {
        title: 'Улиас',
        image: Tree1,
    },
    {
        title: 'Заг',
        image: Tree2,
    },
    {
        title: 'Улиангар',
        image: Tree3
    },
    {
        title: 'Бут',
        image: Tree4
    },
];

function TreeList () {
    return (
        <div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 5,
                }}
                pagination={{ pageSize: 5 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card 
                            hoverable
                            cover={
                                <img
                                    alt="example"
                                    src={item.image}
                                    style={{ width: '100%', height: '200px', objectFit: 'contain', padding: '16px' }}
                                />
                            }
                        >
                            <Meta                                            
                                title={item.title}
                                description="This is the description"
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TreeList;