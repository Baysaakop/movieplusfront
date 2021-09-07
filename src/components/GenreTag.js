import { Button } from "antd"

function GenreTag (props) {
    return (
        <Button type="ghost" shape="round" size="small">{props.genre}</Button>
    )
}

export default GenreTag