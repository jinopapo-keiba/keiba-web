import RaceResultColumn from "./RaceResultColumn";

export default function RaceResultTable(props) {

    return(
        <tbody>
            <td>{props.horse.frameNumber}</td>
            <td>{props.horse.name}</td>
            {props.horse.raceResults.length === 0 ?
                <td>出走経験なし</td> : 
                props.horse.raceResults.map(
                    (raceResult) => {
                        return (
                            <RaceResultColumn
                                fullTime={raceResult.result.devFullTime}
                                lastRapTime={raceResult.result.devLastRapTime}
                                ranking={raceResult.result.ranking}
                                race={raceResult.race} />
                        )
                    }
                )
            }
      </tbody>
    )
}