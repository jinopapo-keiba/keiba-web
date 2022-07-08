import Link from "next/link";
import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";

export class BeforeRaceMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            stadium: props.race.stadium,
            round: props.race.round,
            updateStadium: () => {
                this.setState({
                    stadium: "test"
                })
            }
       }
    }

    render() {
        return (
            <>
                <ButtonGroup>
                    <Dropdown style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: "100px"}}>
                            {this.state.stadium}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.beforeRaces.stadiums.map(
                                (stadium) => (<Dropdown.Item onClick={() => { this.setState({ stadium: stadium })}}>{stadium}</Dropdown.Item>)
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic"  style={{width: "200px"}}>
                            {this.props.beforeRaces.races[this.state.stadium][this.state.round].name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.beforeRaces.races[this.state.stadium].map(
                                (race) => (
                                <Link href={`?raceId=${race.id}`} passHref>
                                    <Dropdown.Item>{race.round + ":" + race.name}</Dropdown.Item>
                                </Link>)
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonGroup>
            </>
        )
    }
}