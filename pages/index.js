import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { ButtonGroup, Card, Col, Dropdown, Navbar, NavbarBrand, Row, Table } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import TimeChart from '../components/TimeChart'
import StadiumRepository from '../repository/StadiumRepository';
import Link from 'next/link';

function normalizeTimes(times){
  const normalizedTimes = times.map(time => time/1000)
  let minTime =  Number.MAX_SAFE_INTEGER
  normalizedTimes.forEach(
    time => {
      if(time !== 0){
        minTime = Math.min(minTime,time - 0.3)
      }
    }
  )
  return {
    minTime: minTime,
    normalizedTimes: normalizedTimes
  }
}

function convertTimes(horses,minFullTimes,avgFullTimes,minLastRapTimes,avgLastRapTimes){
  const fullTimes = []
  const lastRapTimes = []
  const minFullTime = Math.min(minFullTimes.minTime,avgFullTimes.minTime)
  const minLastRapTime = Math.min(minLastRapTimes.minTime,avgLastRapTimes.minTime)
  for(let i=0; i < horses.length; i++){
    fullTimes.push(
      {
        name: horses[i].name,
        min: minFullTimes.normalizedTimes[i] === 0 ? minFullTime.toFixed(1) : minFullTimes.normalizedTimes[i].toFixed(1),
        avg: avgFullTimes.normalizedTimes[i] === 0 ? minFullTime.toFixed(1) : avgFullTimes.normalizedTimes[i].toFixed(1)
      }
    )
    lastRapTimes.push(
      {
        name: horses[i].name,
        min: minLastRapTimes.normalizedTimes[i] === 0 ? minLastRapTime.toFixed(1) : minLastRapTimes.normalizedTimes[i].toFixed(1),
        avg: avgLastRapTimes.normalizedTimes[i] === 0 ? minLastRapTime.toFixed(1) : avgLastRapTimes.normalizedTimes[i].toFixed(1),
      }
    )
  }
  return {
    minFullTime: minFullTime,
    fullTimes: fullTimes,
    minLastRapTime: minLastRapTime,
    lastRapTimes: lastRapTimes
  }
}

export async function getServerSideProps(context) {
  const racesResponse = await fetch("http://localhost:8080/v1/race/before")
  const races = await racesResponse.json();
  const raceId = context.query.raceId ? context.query.raceId : races[0].id
  const length = context.query.length ? context.query.length : races[0].raceLength
  const stadium = context.query.stadium ? context.query.stadium : races[0].stadium
  
  
  const minResponse = await fetch(`http://localhost:8080/v1/raceResult/bestTime?raceLength=${length}&raceId=${raceId}`)
  const minJson = await minResponse.json();
  const minFullTimes = normalizeTimes(minJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.fullTime))
  const minLastRapTimes = normalizeTimes(minJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.lastRapTime))
  const avgResponse = await fetch(`http://localhost:8080/v1/raceResult/bestTime?raceLength=${length}&raceId=${raceId}&summaryType=AVG`)
  const avgJson = await avgResponse.json();
  const avgFullTimes = normalizeTimes(avgJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.fullTime))
  const avgLastRapTimes = normalizeTimes(avgJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.lastRapTime))
  const minShortResponse = await fetch(`http://localhost:8080/v1/raceResult/bestTime?stadium=${stadium}&raceLength=${length}&raceId=${raceId}`)
  const minShortJson = await minShortResponse.json();
  const minShortFullTimes = normalizeTimes(minShortJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.fullTime))
  const minShortLastRapTimes = normalizeTimes(minShortJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.lastRapTime))
  const avgShortResponse = await fetch(`http://localhost:8080/v1/raceResult/bestTime?stadium=${stadium}&raceLength=${length}&raceId=${raceId}&summaryType=AVG`)
  const avgShortJson = await avgShortResponse.json();
  const avgShortFullTimes = normalizeTimes(avgShortJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.fullTime))
  const avgShortLastRapTimes = normalizeTimes(avgShortJson.bestRaceTimes.map(bestRaceTime => bestRaceTime.lastRapTime))
  const horses = minJson.bestRaceTimes.map(bestRaceTime => { 
    return {
      name: bestRaceTime.raceHorse.horse.name,
      frameNumber: bestRaceTime.raceHorse.frameNumber
    }
  })

  const {minFullTime,fullTimes,minLastRapTime,lastRapTimes} = convertTimes(horses,minFullTimes,avgFullTimes,minLastRapTimes,avgLastRapTimes)
  const shotTime = convertTimes(horses,minShortFullTimes,avgShortFullTimes,minShortLastRapTimes,avgShortLastRapTimes)
  const ranStadiums = await StadiumRepository.fetchRanStadium(raceId,length)

  return {
    props: {
      fullTimes: fullTimes,
      minFullTime: minFullTime,
      lastRapTimes: lastRapTimes,
      minLastRapTime: minLastRapTime,
      minShortFullTime: shotTime.minFullTime,
      shortFullTimes: shotTime.fullTimes,
      minShortLastRapTime: shotTime.minLastRapTime,
      lastShortRapTimes: shotTime.lastRapTimes,
      horses: horses,
      races: races,
      ranStadiums: ranStadiums,
      stadium: stadium,
      length: length,
      raceId: raceId
    }
  }
}

export default function Home(props) {
  const horses = []
  const races = []
  const stadiums = []
  props.horses.forEach(
    horse => horses.push(<tr><td>{horse.frameNumber}</td><td>{horse.name}</td></tr>)
  )
  props.races.forEach(
    race => races.push(<Link href={`?raceId=${race.id}&length=${race.raceLength}&stadium=${race.stadium}`} passHref><Dropdown.Item>{race.raceName}</Dropdown.Item></Link>)
  )
  props.ranStadiums.forEach(
    stadium => stadiums.push(<Link href={`?raceId=${props.raceId}&length=${props.length}&stadium=${stadium}`} passHref><Dropdown.Item>{stadium}</Dropdown.Item></Link>)
  )
  return (
    <dev>
      <Head>
        <title>Umaaaaaa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>
      </Head>
      <header>
        <Navbar bg="dark" expand="md" variant="dark">
          <Container style={{padding: "0"}}>
            <Navbar.Brand href="#home">Umaaaaaa</Navbar.Brand>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              レース選択
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {races}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              競技場選択
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {stadiums}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
        </Container>
        <Container>
          <Row>
            <Col>
              <TimeChart title="同距離同会場フルタイム" data={props.fullTimes} dataMin={props.minFullTime}></TimeChart>
            </Col>
            <Col>
              <TimeChart title="同距離同会場上がり" data={props.lastRapTimes} dataMin={props.minLastRapTime} ></TimeChart>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <TimeChart title={`同距離${props.stadium}フルタイム`} data={props.shortFullTimes} dataMin={props.minShortFullTime}></TimeChart>
            </Col>
            <Col>
              <TimeChart title={`同距離${props.stadium}上がり`} data={props.lastShortRapTimes} dataMin={props.minShortLastRapTime} ></TimeChart>
            </Col>
          </Row>
        </Container>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>枠</th>
                <th>馬名</th>
              </tr>
            </thead>
            <tbody>
              {horses}
            </tbody>
          </Table>
        </Container>
      </main>

    </dev>
  )
}
