import {convertColorByScore} from'../util/color';

export default function RaceResultColumn(props) {
    let backgroundColor
    switch(props.ranking) {
        case 1:
            backgroundColor =  "#ffef7f"
            break
        case 2:
            backgroundColor =  "#cbdeff"
            break
        case 3:
            backgroundColor =  "#efc79f"
            break
    }
    return(
        <td style={{backgroundColor: backgroundColor,width: "250px"}}>
            <ul>
                <li>{props.race.raceDate}</li>
                <li>{props.race.raceName}</li>
                <li>{props.race.stadium} {props.race.raceType}{props.race.raceLength} {props.race.raceCondition}</li>
                <li>順位:{props.ranking}</li>
                <li>フルタイム:<span style={convertColorByScore(props.fullTime)}>{props.fullTime > 0 ? props.fullTime.toFixed(1) : 0}</span></li>
                <li>上がり:<span style={convertColorByScore(props.lastRapTime)}>{props.lastRapTime > 0 ? props.lastRapTime.toFixed(1) : 0}</span></li>
            </ul>
        </td>
    )
}