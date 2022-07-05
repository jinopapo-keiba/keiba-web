import Link from "next/link"
import { Col, Container, Dropdown, Nav, Navbar, Row, Tab, Table, Tabs } from "react-bootstrap"
import RecentResult from "../components/RecentResult"
import RecentResultService from "../service/RecentResultService"

export async function getServerSideProps(context) {
    return {
        props: await RecentResultService.makeRecentResultDate(context.query.raceId,context.query.raceLength,context.query.stadium,context.query)
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
                            <Tabs defaultActiveKey="recent">
                                <Tab eventKey="summary" title="総合評価">

                                </Tab>
                                <Tab eventKey="recent" title="直近レース">
                                    <RecentResult {...props}/>
                                </Tab>
                            </Tabs>
                        </Container>
                    </Col>
                </Row>
            </main>
        </>
    )
}