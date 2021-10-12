import { Popover, Timeline, Typography } from "antd"
import moment from 'moment'
import FilmPopover from "../Film/FilmPopover"

function Filmography (props) {

    function orderByYear (crew) {
        return crew.sort((a, b) => moment(a.film.releasedate).year() - moment(b.film.releasedate).year())
    }

    return (        
        <div className="container">
            <Typography.Title level={5}>{props.title}</Typography.Title>            
            <Timeline style={{ marginTop: '16px' }}>
                {orderByYear(props.data).map(member => (
                    <Timeline.Item>
                        <Popover
                            title={false}
                            placement="rightTop"
                            content={
                                <FilmPopover film={member.film} />
                            }
                        >
                            <a className="film-timeline" href={`/films/${member.film.id}`}>{moment(member.film.releasedate).year()} - {member.film.title}</a>                                   
                        </Popover>                                            
                    </Timeline.Item>             
                ))}                                                                
            </Timeline>    
        </div>        
    )
}

export default Filmography