import Link from "next/link"
import { Col, Container, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap"
import { BeforeRaceMenu } from "../components/BeforeRaceMenu"
import RecentResult from "../components/RecentResult"
import { SummaryResult } from "../components/SummeryResult"
import RaceRepository from "../repository/RaceRepository"
import BeforeRaceService from "../service/BeforeRaceService"
import RecentResultService from "../service/RecentResultService"
import SummaryResultService from "../service/SummaryResultService"

export async function getServerSideProps(context) {
    const race = await RaceRepository.fetchRace(context.query.raceId)
    const summaryResultPromise = SummaryResultService.makeSummaryResult(context.query.raceId,race[0].raceLength,"良")
    const recentReusltPromise =  RecentResultService.makeRecentResultDate(context.query.raceId,context.query.raceLength,context.query.stadium,context.query)
    const beforeRacesPromise = BeforeRaceService.makeBeforeRace()
    return {
        props: {
            recentReuslt: await recentReusltPromise,
            beforeRaces: await beforeRacesPromise,
            summaryResult: await summaryResultPromise,
            race: race[0]
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