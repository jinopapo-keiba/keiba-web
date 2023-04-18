import Link from "next/link"
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap"
import { BeforeRaceMenu } from "../components/BeforeRaceMenu"
import { RaceDetail } from "../components/RaceDetail"
import RecentResult from "../components/RecentResult"
import { SummaryResult } from "../components/SummeryResult"
import RaceRepository from "../repository/RaceRepository"
import BeforeRaceService from "../service/BeforeRaceService"
import RecentResultService from "../service/RecentResultService"
import SummaryResultService from "../service/SummaryResultService"

export async function getServerSideProps(context) {
    const stadiumsParams = Array.isArray(context.query.stadiums) ? context.query.stadiums : [context.query.stadiums]

    const race = await RaceRepository.fetchRace(context.query.raceId)
    const summaryResultPromise = SummaryResultService.makeSummaryResult(race[0],context.query.raceId,context.query.raceLength,stadiumsParams,null)
    const recentReusltPromise =  RecentResultService.makeRecentResultDate(context.query.raceId,context.query.raceLength,stadiumsParams,context.query)
    const beforeRacesPromise = BeforeRaceService.makeBeforeRace()
    const stadiums = ["札幌","函館","新潟","福島","東京","中山","中京","京都","阪神","小倉"]
    return {
        props: {
            recentReuslt: await recentReusltPromise,
            beforeRaces: await beforeRacesPromise,
            summaryResult: await summaryResultPromise,
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
                                        <Button variant="outline-dark" href={`/result?raceId=${props.race.id}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !props.requestParam.raceLength}>絞り込みなし</Button>
                                        <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !props.requestParam.raceLength}>同競技場</Button>
                                        <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !!props.requestParam.raceLength}>同距離</Button>
                                        <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !!props.requestParam.raceLength}>同競技場同距離</Button>
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
                                        <input name="raceId" value={props.race.id} hidden/>
                                        <Button as="input" type="submit" variant="outline-dark" value="絞り込み"/>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Tabs defaultActiveKey="recent">
                                <Tab eventKey="summary" title="総合評価">
                                    <SummaryResult {...props.summaryResult}/>
                                </Tab>
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