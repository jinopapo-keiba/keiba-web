import { Row } from "react-bootstrap";
import RaceResultColumn from "./RaceResultColumn";

export default function RaceResultTable(props) {
    const backgroundColor = props.horse.score === 0 ? "#C0C0C0" : ""
    return(
        <tbody style={{"backgroundColor?": backgroundColor}}>
            <td>{props.horse.frameNumber}</td>
            <td>
                <Row>{props.horse.name}({props.raceHorse.old}歳)</Row>
                <Row>騎手：{props.raceHorse.jockey.name}</Row>
                <Row>予想単勝率：{props.horse.score}</Row>
            </td>
            {props.horse.raceResults.length === 0 ?
                <td>出走経験なし</td> : 
                props.horse.raceResults.map(
                    (raceResult) => {
                        return (
                            <RaceResultColumn
                                fullTime={raceResult.raceHorse.raceResult.devFullTime}
                                lastRapTime={raceResult.raceHorse.raceResult.devLastRapTime}
                                targetFullTime={raceResult.raceHorse.raceResult.devTargetRaceFullTime}
                                targetLastRapTime={raceResult.raceHorse.raceResult.devTargetRaceLastRapTime}
                                ranking={raceResult.raceHorse.raceResult.ranking}
                                race={raceResult.race}
                                score={props.horse.score} />
                        )
                    }
                )
            }
      </tbody>
    )
}