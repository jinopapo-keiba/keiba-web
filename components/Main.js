import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { BeforeRaceMenu } from "./BeforeRaceMenu";
import { RaceDetail } from "./RaceDetail";
import RecentResult from "./RecentResult";
import { useState } from 'react';
import { useRouter } from "next/router";
import RaceInfoForm from "./RaceInfoForm";
import RecommendHorse from "./RecommendHorse";

export default function Main({beforeRaces,race,stadiums,requestParam,recentResult}) {
    const [loadingFlag, setLoadingFlag] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const handleStart = (url) => url !== router.asPath && setLoadingFlag(true)
        const handleComplete = () => setLoadingFlag(false)
    
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
    
        return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
        }
      })

    const loadingComponent = (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Spinner animation="border" role="status" className="center-block"></Spinner>
        </div>
    );

    const mainConmponent = (
        <>
        <BeforeRaceMenu beforeRaces={beforeRaces} race={race} />
        <RaceDetail race={race} />
        <RecommendHorse recommendHorse={recentResult.topHorse} confidentFlag={recentResult.confidentFlag} buyFlag={recentResult.buyFlag}/>
        <Tabs defaultActiveKey="recent">
            <Tab eventKey="recent" title="直近レース">
                <RecentResult {...recentResult} />
            </Tab>
        </Tabs>
        <Card className="m-3">
            <Card.Header>
                絞り込み条件
            </Card.Header>
            <Card.Body>
                <Form action="/" method="get">
                    <Form.Group className="mb-3">
                        <h4>
                            競技場
                        </h4>
                        {
                            stadiums.map((stadium, index) => (
                                <Form.Check inline label={stadium} id={`stadium${index}`} name="stadiums" value={stadium} defaultChecked={!!requestParam.stadiums && requestParam.stadiums.includes(stadium)} />
                            ))
                        }
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3">
                            <h4>
                                最短距離
                            </h4>
                            <Form.Control type="number" name="minRaceLength" defaultValue={requestParam.minRaceLength} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <h4>
                                最長距離
                            </h4>
                            <Form.Control type="number" name="maxRaceLength" defaultValue={requestParam.maxRaceLength} />
                        </Form.Group>
                    </Row>
                    <input name="raceId" defaultValue={race.id} hidden />
                    <Button as="input" type="submit" variant="outline-dark" value="絞り込み" className="mr-3" />
                    <Button href={`?raceId=${race.id}`} variant="outline-dark">リセット</Button>
                </Form>
            </Card.Body>
        </Card>
        <RaceInfoForm raceCondition={requestParam.raceCondition} race={race}/>
        </>
    )

    return (
        <>
            <Container style={{ maxWidth: "2000px" }}>
                {loadingFlag && loadingComponent}
                {!loadingFlag && mainConmponent}
            </Container>
        </>
    )
}