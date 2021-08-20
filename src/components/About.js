import React from 'react';
import { Grid, Col, Row, Typography } from 'antd';
import AboutTreePlus from './images/About.svg';
import Planting from './images/Planting.svg';
import Park from './images/Park.svg';
import Social from './images/Social.svg';

const { useBreakpoint } = Grid;

function About (props) {
    const screens = useBreakpoint();
    return (
        <div>
            { screens.xs ? (
                <div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                <img src={Planting} alt="Planting" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                                <div>
                                    <Typography.Title level={3}>Мод тарихын ач тус</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>                                                                    
                        </Row>
                    </div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={8}>
                                <img src={Park} alt="Park" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                                <div>
                                    <Typography.Title level={3}>Ногоон бүс</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>                    
                        </Row>
                    </div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                <img src={Social} alt="Social" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                                <div>
                                    <Typography.Title level={3}>Мод таригч гишүүд</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>                                                                    
                        </Row>
                    </div>                     
                </div>
            ) : (
                <div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={8}>
                                <img src={AboutTreePlus} alt="AboutTreePlus" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                                <div style={{ paddingLeft: '10%' }}>
                                    <Typography.Title level={3}>TREE+ төслийн тухай</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>                    
                        </Row>
                    </div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={16}>
                                <div>
                                    <Typography.Title level={3}>Мод тарихын ач тус</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                <img src={Planting} alt="Planting" style={{ width: '100%', height: 'auto' }} />
                            </Col>                                        
                        </Row>
                    </div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={8}>
                                <img src={Park} alt="Park" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                                <div style={{ paddingLeft: '10%' }}>
                                    <Typography.Title level={3}>Ногоон бүс</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>                    
                        </Row>
                    </div>
                    <div style={{ margin: '16px' }}>                
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={16}>
                                <div>
                                    <Typography.Title level={3}>Мод таригч гишүүд</Typography.Title>
                                    <Typography.Paragraph>
                                        In purus lectus, consectetur sed arcu quis, pellentesque egestas risus. Nunc cursus tincidunt eros, nec aliquet dui ultrices eu. Donec rhoncus turpis turpis. Suspendisse sit amet malesuada turpis, id eleifend urna. Fusce vitae orci ac ipsum bibendum venenatis at quis massa. Integer ante risus, commodo vel ornare quis, tincidunt non neque. Morbi ex enim, sodales sagittis dui sit amet, rhoncus tincidunt orci. Donec id ornare libero, at accumsan nulla. Donec non consequat lectus. Aenean malesuada elit a risus euismod, vel pellentesque ligula ullamcorper. Proin vel auctor metus. Donec cursus diam neque, non gravida risus sodales in.
                                    </Typography.Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                <img src={Social} alt="Social" style={{ width: '100%', height: 'auto' }} />
                            </Col>                                        
                        </Row>
                    </div>
                </div>
            )}
        </div>
    )
}

export default About;