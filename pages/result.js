import Link from "next/link"
import { Button, Card, Col, Container, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap"
import { BeforeRaceMenu } from "../components/BeforeRaceMenu"
import { RaceDetail } from "../components/RaceDetail"
import RecentResult from "../components/RecentResult"
import { SummaryResult } from "../components/SummeryResult"
import RaceRepository from "../repository/RaceRepository"
import BeforeRaceService from "../service/BeforeRaceService"
import RecentResultService from "../service/RecentResultService"
import SummaryResultService from "../service/SummaryResultService"

export async function getServerSideProps(context) {
    const race = await RaceRepository.fetchRace(context.query.raceId)
    const summaryResultPromise = SummaryResultService.makeSummaryResult(race[0],context.query.raceId,context.query.raceLength,null)
    const recentReusltPromise =  RecentResultService.makeRecentResultDate(context.query.raceId,context.query.raceLength,context.query.stadium,context.query)
    const beforeRacesPromise = BeforeRaceService.makeBeforeRace()
    return {
        props: {
            recentReuslt: await recentReusltPromise,
            beforeRaces: await beforeRacesPromise,
            summaryResult: await summaryResultPromise,
            race: race[0],
            requestParam: context.query
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
                                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !props.requestParam.raceLength}>絞り込みなし</Button>
                                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !props.requestParam.raceLength}>同競技場</Button>
                                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!props.requestParam.stadium & !!props.requestParam.raceLength}>同距離</Button>
                                    <Button variant="outline-dark" href={`/result?raceId=${props.race.id}&stadium=${props.race.stadium}&raceLength=${props.race.raceLength}`} style={{ marginLeft: "1rem" }} active={!!props.requestParam.stadium & !!props.requestParam.raceLength}>同競技場同距離</Button>
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