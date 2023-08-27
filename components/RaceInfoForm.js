import React, { useState } from "react"
import { Button, Card, Form} from "react-bootstrap"

export default function RaceInfoForm({race,raceCondition}) {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    馬場状態
                </Card.Header>
                <Card.Body>
                    <Form action="/" method="get">
                        <Form.Group className="mb-3">
                            <h4>馬場状態</h4>
                            <Form.Control as="select" name="raceCondition">
                                <option value="">選択してください</option>
                                <option value="良" selected={raceCondition == "良"}>良</option>
                                <option value="稍重" selected={raceCondition == "稍重"}>稍重</option>
                                <option value="重" selected={raceCondition == "重"}>重</option>
                                <option value="不良" selected={raceCondition == "不良"}>不良</option>
                            </Form.Control>
                        </Form.Group>
                        <input name="raceId" defaultValue={race.id} hidden />
                        <Button as="input" type="submit" variant="outline-dark" value="反映" className="mr-3" />
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}