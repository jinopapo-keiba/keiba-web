import Link from "next/link"
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap"
import { BeforeRaceMenu } from "../components/BeforeRaceMenu"
import { RaceDetail } from "../components/RaceDetail"
import RecentResult from "../components/RecentResult"
import RaceRepository from "../repository/RaceRepository"
import BeforeRaceService from "../service/BeforeRaceService"
import RecentResultService from "../service/RecentResultService"

export async function getServerSideProps(context) {
    const stadiumsParams = Array.isArray(context.query.stadiums) ? context.query.stadiums : [context.query.stadiums]

    const race = await RaceRepository.fetchRace(context.query.raceId)
    const recentReusltPromise =  RecentResultService.makeRecentResultDate(context.query.raceId,context.query.minRaceLength,context.query.maxRaceLength,stadiumsParams,context.query)
    const beforeRacesPromise = BeforeRaceService.makeBeforeRace()
    const stadiums = ["札幌","函館","新潟","福島","東京","中山","中京","京都","阪神","小倉"]
    return {
        props: {
            recentReuslt: await recentReusltPromise,
            beforeRaces: await beforeRacesPromise,
            race: race[0],
            requestParam: context.query,
            stadiums: stadiums
        }
    }
}

export default function Home(props) {
    return(
        <>
            <main>
                <Row>
                    <Col md={2} className={"bg-dark"}>
                        <Navbar variant="dark">
                            <Nav className="flex-column">
                                <Link href="/analytics" passHref>
                                    <Nav.Link>
                                        過去レース分析
                                    </Nav.Link>
                                </Link>
                                <Link href="/" passHref>
                                    <Nav.Link>
                                        開催レース分析
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col md={10}>
                        <Container style={{ maxWidth: "2000px" }}>
                            <BeforeRaceMenu beforeRaces={props.beforeRaces} race={props.race} />
                            <RaceDetail race={props.race} />
                            <Card className="m-3">
                                <Card.Header>
                                    絞り込み条件
                                </Card.Header>
                                <Card.Body>
                                    <Form action="/result" method="get">
                                        <Form.Group className="mb-3">
                                            <h4>
                                                競技場
                                            </h4>
                                            {
                                                props.stadiums.map((stadium, index) => (
                                                    <Form.Check inline label={stadium} id={`stadium${index}`} name="stadiums" value={stadium} defaultChecked={!!props.requestParam.stadiums && props.requestParam.stadiums.includes(stadium)}/>
                                                ))
                                            }
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3">
                                                <h4>
                                                    最短距離
                                                </h4>
                                                <Form.Control type="number" name="minRaceLength" defaultValue={props.requestParam.minRaceLength}/>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3">
                                                <h4>
                                                    最長距離
                                                </h4>
                                                <Form.Control type="number" name="maxRaceLength" defaultValue={props.requestParam.maxRaceLength}/>
                                            </Form.Group>
                                        </Row>
                                        <input name="raceId" value={props.race.id} hidden/>
                                        <Button as="input" type="submit" variant="outline-dark" value="絞り込み" className="mr-3"/>
                                        <Button href={`/result?raceId=${props.race.id}`} variant="outline-dark">リセット</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Tabs defaultActiveKey="recent">
                                <Tab eventKey="recent" title="直近レース">
                                    <RecentResult {...props.recentReuslt}/>
                                </Tab>
                            </Tabs>
                        </Container>
                    </Col>
                </Row>
            </main>
        </>
    )
}