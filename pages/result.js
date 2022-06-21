import Head from "next/head"
import { Container, Table } from "react-bootstrap"
import RaceResultColumn from "../components/RaceResultColumn"
import RaceResultTable from "../components/RaceResultTable"

export async function getServerSideProps(context) {
    return {
        props: {

        }
    }
}

export default function Home(props) {
    return(
        <dev>
            <Head>
                <title>Umaaaaaa</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>
            </Head>


            <main>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>枠</th>
                                <th>馬名</th>
                                <th>1走前</th>
                                <th>2走前</th>
                                <th>3走前</th>
                                <th>4走前</th>
                                <th>5走前</th>
                            </tr>
                        </thead>
                        <RaceResultTable horse={{
                            results: [
                                {
                                    race: {
                                        name: "皐月賞",
                                        stadium: "阪神",
                                        length: 2400,
                                        raceType: "芝",
                                        grade: "G1",
                                        raceCondition: "良",
                                        raceDate: "2022/01/01"
                                    },
                                    minTime: 55,
                                    fullTime: 50
                                }
                            ],
                            frameNumber: 1,
                            name: "ディープインパクト"
                        }} />
                    </Table>
                </Container>
            </main>
        </dev>
    )
}