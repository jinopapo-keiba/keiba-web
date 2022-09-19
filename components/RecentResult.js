import RaceResultTable from "./RaceResultTable";

export default function RecentResult (props) {
    return (
        <>
            <div className="table-responsive">
                <table className="table" style={{ width: "max-content" }}>
                    <thead>
                        <tr>
                            <th>枠</th>
                            <th>馬名</th>
                            {[...Array(props.maxResult).keys()].map(
                                (index) => (<th>{index + 1}走前</th>)
                            )}
                        </tr>
                    </thead>
                    {props.horses.map((horse,index) => <RaceResultTable horse={horse} raceHorse={props.race.raceHorses[index]}/>)}
                </table>
            </div>
        </>
    )
}