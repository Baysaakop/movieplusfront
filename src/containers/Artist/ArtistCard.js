import { Card, Tooltip } from "antd"
import './ArtistCard.css'
import blank from '../Film/blank.jpg'

function ArtistCard (props) {    
    return (
        <div className="artist-card">
            <Card
                bordered={false}
                hoverable                                
                cover={
                    <Tooltip title={props.artist.name}>
                        <div className="artist-avatar-container">                        
                            <a href={`/artists/${props.artist.id}`}>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <div style={{ position: 'relative', paddingBottom: '150%', width: '100%', height: '100%', overflow: 'hidden' }}>                                                                                                 
                                        <img className="artist-avatar" alt={props.artist.name} src={props.artist.avatar ? props.artist.avatar : blank} />
                                    </div>
                                </div>                            
                            </a>                                                
                        </div>
                    </Tooltip>
                }                       
            >                
                {/* <Typography.Text className="artist-occupation">
                    {props.artist.occupation ? props.artist.occupation[0].name : ''}
                </Typography.Text> */}
            </Card>
            {/* <Typography.Paragraph className="artist-title" ellipsis={{ rows: 2 }}>{props.artist.name}</Typography.Paragraph> */}
        </div>
    )
}

export default ArtistCard