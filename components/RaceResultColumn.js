import { Col, Container, Row } from 'react-bootstrap';
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
        <td style={{backgroundColor: backgroundColor,width: "270px"}}>
            <Row>
                <Col xs={8}>{props.race.raceName}</Col>
                <Col xs={4}><span className="h3">{props.ranking}</span>着</Col>
            </Row>
            <Row style={{fontSize: "small"}}>
                <Col xs={5}>{props.race.raceDate}</Col>
                <Col xs={7}>{props.race.stadium} {props.race.raceType}{props.race.raceLength} {props.race.raceCondition}</Col>
            </Row>
            <Row>
                <Col xs={5}><span style={{fontSize: "small"}}>上がり:</span><span style={convertColorByScore(props.lastRapTime)} className="h5">{props.lastRapTime > 0 ? props.lastRapTime.toFixed(1) : 0}</span></Col>
                <Col xs={7}><span style={{fontSize: "small"}}>フルタイム:</span><span style={convertColorByScore(props.fullTime)} className="h5">{props.fullTime > 0 ? props.fullTime.toFixed(1) : 0}</span></Col>
            </Row>
        </td>
    )
}