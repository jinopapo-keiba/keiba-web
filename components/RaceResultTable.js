import RaceResultColumn from "./RaceResultColumn";

export default function RaceResultTable(props) {

    return(
        <tbody>
            <td>{props.horse.frameNumber}</td>
            <td>{props.horse.name}</td>
            {props.horse.results.map(
                (result) => {
                    if(Object.keys(result).length === 0) {
                        return ("-")
                    }else{
                        return  (
                        <RaceResultColumn 
                            fullTime={result.fullTime} 
                            minTime={result.minTime} 
                            race={result.race}/>
                        )
                    }
                }
            )}
      </tbody>
    )
}