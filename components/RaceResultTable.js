import { Row } from "react-bootstrap";
import RaceResultColumn from "./RaceResultColumn";

export default function RaceResultTable(props) {
    const backgroundColor = props.horse.score === 0 ? "#C0C0C0" : ""
    return(
        <tbody style={{"background-color": backgroundColor}}>
            <td>{props.horse.frameNumber}</td>
            <td>
                {props.horse.name}({props.raceHorse.old}歳)
                <Row>馬スコア：{props.horse.score}</Row>
                <Row>勝率: {props.horse.rate}%</Row>
            </td>
            {props.horse.raceResults.length === 0 ?
                <td>出走経験なし</td> : 
                props.horse.raceResults.map(
                    (raceResult) => {
                        return (
                            <RaceResultColumn
                                fullTime={raceResult.result.devFullTime}
                                lastRapTime={raceResult.result.devLastRapTime}
                                targetFullTime={raceResult.result.devTargetRaceFullTime}
                                targetLastRapTime={raceResult.result.devTargetRaceLastRapTime}
                                ranking={raceResult.result.ranking}
                                race={raceResult.race}
                                score={props.horse.score} />
                        )
                    }
                )
            }
      </tbody>
    )
}