import React from "react";
import { Card } from "react-bootstrap";

export class RaceDetail extends React.Component {
    render() {
        return (
            <>
                <h2>{this.props.race.raceName} {this.props.race.raceLength}m {this.props.race.grade}</h2>
            </>
        )
    }
}