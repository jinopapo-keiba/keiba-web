import {convertColorByScore} from'../util/color';

export default function RaceResultColumn(props) {
    return(
        <td>
            <ul>
                <li>皐月賞 G1 阪神2400 芝 16頭</li>
                <li>フルタイム:<span style={convertColorByScore(50)}>{50}</span></li>
                <li>上がり:<span style={convertColorByScore(55)}>{55}</span></li>
            </ul>
        </td>
    )
}