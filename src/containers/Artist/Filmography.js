import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Popover, Typography, Table } from "antd"
import moment from 'moment'
import FilmPopover from "../Film/FilmPopover"

function Filmography (props) {

    const crewColumns = [
        {
            title: 'Он',
            dataIndex: props.mode,
            key: props.mode,
            render: item => moment(item.releasedate).year()
        },
        {
            title: 'Уран бүтээл',
            dataIndex: props.mode,
            key: props.mode,
            render: item => 
                <Popover
                    title={false}
                    placement="rightTop"
                    content={
                        <FilmPopover film={item} />
                    }
                >
                    { props.mode === "film" ? (
                        <a className="film-timeline" href={`/films/${item.id}`}>
                            {item.title}
                        </a>                                   
                    ) : (
                        <a className="film-timeline" href={`/series/${item.id}`}>
                            {item.title}
                        </a>                                   
                    )}                               
                </Popover>        
        },
        {
            title: 'Үүрэг',
            dataIndex: 'roles',
            key: 'roles',
            render: item => getRoles(item)
        }
    ]

    const castColumns = [
        {
            title: 'Он',
            dataIndex: props.mode,
            key: props.mode,
            render: item => moment(item.releasedate).year()
        },
        {
            title: 'Уран бүтээл',
            dataIndex: props.mode,
            key: props.mode,
            render: item => 
                <Popover
                    title={false}
                    placement="rightTop"
                    content={
                        <FilmPopover film={item} />
                    }
                >
                    { props.mode === "film" ? (
                        <a className="film-timeline" href={`/films/${item.id}`}>
                            {item.title}
                        </a>                                   
                    ) : (
                        <a className="film-timeline" href={`/series/${item.id}`}>
                            {item.title}
                        </a>                                   
                    )}                    
                </Popover>        
        },
        {
            title: 'Гол дүр',
            dataIndex: 'is_lead',
            key: 'is_lead',
            render: item => item === true ? <CheckOutlined /> : <CloseOutlined />
        },
        {
            title: 'Дүр',
            dataIndex: 'role_name',
            key: 'role_name'            
        }
    ]

    function getRoles (data) {
        let arr = ""
        data.forEach(role => {
            arr += role.name + ", "
        })
        return arr.substr(0, arr.length - 2)
    }

    function orderByYear (data) {
        return data.sort((a, b) => moment(a.film.releasedate).year() - moment(b.film.releasedate).year())
    }

    return (        
        <div className="container">
            <Typography.Title level={5}>{props.title} ({props.data.length})</Typography.Title>       
            <Table columns={props.type === "crew" ? crewColumns : castColumns} dataSource={orderByYear(props.data)} size="small" pagination={false} />     
        </div>        
    )
}

export default Filmography