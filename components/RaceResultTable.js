import RaceResultColumn from "./RaceResultColumn";

export default function RaceResultTable(props) {

    return(
        <tbody>
            <td>{props.horse.frameNumber}</td>
            <td>{props.horse.name}</td>
            {props.horse.raceResults.map(
                (raceResult) => {
                    if(Object.keys(raceResult).length === 0) {
                        return ("-")
                    }else{
                        return  (
                        <RaceResultColumn 
                            fullTime={raceResult.result.devFullTime} 
                            minTime={raceResult.result.devLastRapTime} 
                            race={raceResult.race}/>
                        )
                    }
                }
            )}
      </tbody>
    )
}