import { Card } from "react-bootstrap";
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
            <Card className="m-3">
                <Card.Header>
                    軸馬
                </Card.Header>
                <Card.Body>
                    <ul>
                        {props.topHorse.map((horse) => <li>{horse.horseName}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </>
    )
}