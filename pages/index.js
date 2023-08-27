import { SSRProvider } from "react-bootstrap"
import RaceRepository from "../repository/RaceRepository"
import BeforeRaceService from "../service/BeforeRaceService"
import RecentResultService from "../service/RecentResultService"
import Main from "../components/Main"

export async function getServerSideProps(context) {
    const stadiumsParams = Array.isArray(context.query.stadiums) ? context.query.stadiums : [context.query.stadiums]

    const race = await RaceRepository.fetchRace(context.query.raceId)
    const recentReusltPromise =  RecentResultService.makeRecentResultDate(context.query.raceId,context.query.minRaceLength,context.query.maxRaceLength,stadiumsParams,context.query)
    const beforeRacesPromise = BeforeRaceService.makeBeforeRace()
    const stadiums = ["札幌","函館","新潟","福島","東京","中山","中京","京都","阪神","小倉"]
    return {
        props: {
            recentResult: await recentReusltPromise,
            beforeRaces: await beforeRacesPromise,
            race: race[0],
            requestParam: context.query,
            stadiums: stadiums
        }
    }
}

export default function Home(props) {
    return(
        <SSRProvider>
            <Main recentResult={props.recentResult} beforeRaces={props.beforeRaces} race={props.race} requestParam={props.requestParam} stadiums={props.stadiums}></Main>
        </SSRProvider>
    )
}