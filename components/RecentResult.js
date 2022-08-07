import Link from "next/link";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import RaceResultTable from "./RaceResultTable";

export default function RecentResult (props) {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    絞り込み条件
                </Card.Header>
                <Card.Body>
                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !props.requestParam.raceLength}>絞り込みなし</Button>
                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !props.requestParam.raceLength}>同競技場</Button>
                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !!props.requestParam.raceLength}>同距離</Button>
                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !!props.requestParam.raceLength}>同競技場同距離</Button>
                </Card.Body>
            </Card>
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