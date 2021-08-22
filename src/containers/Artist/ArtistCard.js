import { Card, Typography } from "antd"
import './ArtistCard.css'

function ArtistCard (props) {    
    return (
        <div className="artist-card">
            <Card
                bordered={false}
                hoverable                                
                cover={
                    <div className="artist-avatar-container">
                        <a href={`/people/${props.artist.id}`}>
                            <img className="artist-avatar" alt={props.artist.name} src={props.artist.avatar} />
                        </a>                        
                    </div>
                }                       
            >
                <Typography.Paragraph className="artist-title" ellipsis={{ rows: 2 }}>{props.artist.name}</Typography.Paragraph>
                <Typography.Text className="artist-occupation">
                    {props.artist.occupation ? props.artist.occupation[0].name : ''}
                </Typography.Text>
            </Card>
        </div>
    )
}

export default ArtistCard