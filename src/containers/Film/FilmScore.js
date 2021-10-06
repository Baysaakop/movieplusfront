import { Progress } from "antd"
import './FilmScore.css'

function FilmScore (props) {

    function getPercent(percent) {
        if (percent === 0 ) {
            return '?'
        } else {
            return `${percent / 10}`
        }
    }

    return (        
        <div className="score">
            <div className={props.type}>
                <Progress                                                                                   
                    type="circle"
                    width={props.type === 'card' ? 40 : props.type === 'detail' ? 80 : 60}                                                 
                    strokeColor={
                        props.score < 25 ? '#eb2f06' :
                        props.score < 50 ? '#e67e22' :
                        props.score < 75 ? '#fff200' :
                        '#4CD137'
                    }
                    trailColor="#3c3c3c"                                 
                    strokeWidth={6}      
                    percent={props.score}
                    format={percent => getPercent(percent)}
                />         
            </div>
        </div>
    )
}

export default FilmScore