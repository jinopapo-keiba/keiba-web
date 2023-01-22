import Link from "next/link";
import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";

export class BeforeRaceMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            stadium: props.race.stadium,
            race: props.race.raceName,
            date: props.race.raceDate
       }
    }

    render() {
        return (
            <>
                <ButtonGroup>
                <Dropdown style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: "100px"}}>
                            {this.state.date}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.beforeRaces.dates.map(
                                (date) => (<Dropdown.Item onClick={() => { this.setState({ date: date })}}>{date}</Dropdown.Item>)
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: "100px"}}>
                            {this.state.stadium}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.beforeRaces.stadiums[this.state.date].map(
                                (stadium) => (<Dropdown.Item onClick={() => { this.setState({ stadium: stadium })}}>{stadium}</Dropdown.Item>)
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic"  style={{width: "250px"}}>
                            {this.state.race}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.beforeRaces.races[this.state.date][this.state.stadium].map(
                                (race) => (
                                <Link href={`?raceId=${race.id}`} passHref>
                                    <Dropdown.Item onClick={() => { this.setState({ race: race.name })}}>{race.round + ":" + race.name}</Dropdown.Item>
                                </Link>)
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonGroup>
            </>
        )
    }
}