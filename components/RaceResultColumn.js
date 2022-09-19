import { Col, Container, Row } from 'react-bootstrap';
import {convertColorByGrade, convertColorByScore} from'../util/color';
import { convertDateText } from '../util/string';

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
                <Col xs={8}>
                    <div style={{marginTop: ".25rem"}}>
                        <span className="h5" style={convertColorByGrade(props.race.grade)}>{props.race.stadium} {props.race.raceType}{props.race.raceLength} </span><span  style={{fontSize: "small"}}>{props.race.grade} {props.race.raceCondition}</span>
                    </div>
                </Col>
                <Col xs={4}><span className="h3">{props.ranking}</span>着 </Col>
            </Row>
            <Row style={{fontSize: "small"}}>
                <Col xs={5}>{convertDateText(props.race.raceDate)} </Col>
                <Col>{props.race.raceName}</Col>
                <Col xs={7}></Col>
            </Row>
            <Row>
                <Col xs={5}><span style={{fontSize: "small"}}>上がり:</span><span style={convertColorByScore(props.lastRapTime)} className="h5">{props.lastRapTime > 0 ? props.lastRapTime.toFixed(1) : 0}</span></Col>
                <Col xs={7}><span style={{fontSize: "small"}}>フルタイム:</span><span style={convertColorByScore(props.fullTime)} className="h5">{props.fullTime > 0 ? props.fullTime.toFixed(1) : 0}</span></Col>
            </Row>
            <Row>
                <Col xs={5}><span style={{fontSize: "small"}}>レース内上がり:</span><span style={convertColorByScore(props.targetLastRapTime)}>{props.targetLastRapTime > 0 ? props.targetLastRapTime.toFixed(1) : 0}</span></Col>
                <Col xs={7}><span style={{fontSize: "small"}}>レース内フルタイム:</span><span style={convertColorByScore(props.targetFullTime)}>{props.targetFullTime > 0 ? props.targetFullTime.toFixed(1) : 0}</span></Col>
            </Row>
        </td>
    )
}