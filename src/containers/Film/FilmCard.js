import { AppstoreAddOutlined, EyeOutlined, HeartOutlined, MoreOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Typography, Progress, Button, Drawer } from "antd";
import { useState } from "react";
import './FilmCard.css'

function FilmCard (props) {

    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <div className="film-card">
            <Card
                bordered={false}
                hoverable                                
                cover={
                    <div className="film-poster-container">
                        <a href={`/films/${props.film.id}`}>
                            <img className="film-poster" alt={props.film.movie.name} src={props.film.movie.poster} />
                        </a>
                        <div className="film-score">
                            <Progress                                
                                type="circle"
                                width={40}                                                 
                                strokeColor="#f39c12"
                                trailColor="#3c3c3c"                                 
                                strokeWidth={6}      
                                percent={props.film.movie.score}
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
                            <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} />
                            <Button className="watchlist" size="large" shape="circle" type="text" icon={<EyeOutlined />} />
                            <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />                            
                            <Button className="rate" size="large" shape="circle" type="text" icon={<StarOutlined />} />
                        </Drawer>
                    </div>
                }                       
            >
                <Typography.Paragraph className="film-title" ellipsis={{ rows: 2 }}>{props.film.movie.name}</Typography.Paragraph>
                <Typography.Text className="film-releasedate">{props.film.movie.releasedate}</Typography.Text>
            </Card>
        </div>
    )
}

export default FilmCard