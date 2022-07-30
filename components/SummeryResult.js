import Link from "next/link";
import React from "react";
import { ButtonGroup, Container, Dropdown, Table } from "react-bootstrap";
import ResultColumn from "./ResultColumn";

export class SummaryResult extends React.Component {
    render(){
        return (
            <>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>枠</th>
                                <th>馬名</th>
                                {this.props.ranStadiums.map(
                                    (stadium) => (<th className='sortable'>{`${stadium}`}</th>)
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.horses.map((horse,index) => (
                                <tr>
                                    <td>{this.props.horses[index].frameNumber}</td>
                                    <td>{this.props.horses[index].name}</td>
                                    {
                                        this.props.stadiumTimes.map(
                                            (times) => times.fullTimes[index].count === 0 
                                            ? (<td>出走なし</td>) 
                                            : (<td><ResultColumn fullTime={times.fullTimes[index]} lastRapTime={times.lastRapTimes[index]} /></td>)
                                        )
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}