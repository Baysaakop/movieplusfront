import { AppstoreAddOutlined, HeartOutlined, MoreOutlined, StarOutlined } from "@ant-design/icons";
import SaveIcon from '../../components/SaveIcon'
import { Card, Typography, Progress, Button, Drawer, Tooltip, Popover, Rate } from "antd";
import { useState } from "react";
import './FilmCard.css'

function FilmCard (props) {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [score, setScore] = useState()

    function onRate (val) {        
        setScore(val)
    }

    return (
        <div className="film-card">
            <Card
                bordered={false}
                hoverable                                
                cover={
                    <div className="film-poster-container">
                        <a href={`/films/${props.film.id}`}>
                            <img className="film-poster" alt={props.film.title} src={props.film.poster} />
                        </a>
                        <div className="film-score">
                            <Progress                                
                                type="circle"
                                width={40}                                                 
                                strokeColor="#f39c12"
                                trailColor="#3c3c3c"                                 
                                strokeWidth={6}      
                                percent={props.film.score}
                                format={percent => `${percent}`}
                            />                    
                        </div>
                        <div className="film-actions">
                            <Button size="small" className="button-more" shape="circle" type="text" icon={<MoreOutlined />} onClick={() => setDrawerOpen(true)} />
                        </div>
                        <Drawer        
                            className="drawer"                    
                            placement="right"                            
                            closable={false}
                            onClose={() => setDrawerOpen(false)}
                            visible={drawerOpen}
                            getContainer={false}                            
                            width={60}                            
                        >
                            <Tooltip title="Таалагдсан" placement="right">
                                <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} />                                
                            </Tooltip>
                            <Tooltip title="Дараа үзэх" placement="right">
                                <Button className="watchlist" size="large" shape="circle" type="text" icon={<SaveIcon />} />
                            </Tooltip>
                            <Tooltip title="Жагсаалтад нэмэх" placement="right">
                                <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />                            
                            </Tooltip>                            
                            <Tooltip title="Үнэлгээ өгөх" placement="right">
                                <Popover                                    
                                    placement="right"
                                    title={<strong>{score ? `Таны үнэлгээ: ${score * 2}` : "Үнэлгээ өгөх"}</strong>}
                                    trigger="click"
                                    content={
                                        <div>
                                            <Rate allowHalf onChange={onRate} />
                                        </div>
                                    }
                                >
                                    <Button className="rate" size="large" shape="circle" type="text" icon={<StarOutlined />} /> 
                                </Popover>                        
                            </Tooltip>                                    
                        </Drawer>
                    </div>
                }                       
            >
                <Typography.Paragraph className="film-title" ellipsis={{ rows: 2 }}>{props.film.title}</Typography.Paragraph>
                <Typography.Text className="film-releasedate">{props.film.releasedate}</Typography.Text>
            </Card>
        </div>
    )
}

export default FilmCard