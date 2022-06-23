import {convertColorByScore} from'../util/color';

export default function RaceResultColumn(props) {
    return(
        <td>
            <ul>
                <li>{props.race.raceDate}</li>
                <li>{props.race.raceName}{props.race.grade ? `(${props.race.grade})` : "" } {props.race.stadium} {props.race.raceType}{props.race.length} {props.race.raceCondition} </li>
                <li>フルタイム:<span style={convertColorByScore(props.fullTime)}>{props.fullTime}</span></li>
                <li>上がり:<span style={convertColorByScore(props.minTime)}>{props.minTime}</span></li>
            </ul>
        </td>
    )
}