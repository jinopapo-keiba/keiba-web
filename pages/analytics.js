import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export async function getServerSideProps(context) {
    const raceLength = context.query.length
    const noneResponsePromise = fetch(`http://localhost:8080/v1/raceResult/stadiumSummary?raceLength=${raceLength}&grade=none`)
    const g3ResponsePromise =  fetch(`http://localhost:8080/v1/raceResult/stadiumSummary?raceLength=${raceLength}&grade=G3`)
    const g2ResponsePromise =  fetch(`http://localhost:8080/v1/raceResult/stadiumSummary?raceLength=${raceLength}&grade=G2`)
    const g1ResponsePromise =  fetch(`http://localhost:8080/v1/raceResult/stadiumSummary?raceLength=${raceLength}&grade=G1`)
    const [noneResponse, g3Response, g2Response, g1Response] = 
        await Promise.all([noneResponsePromise, g3ResponsePromise, g2ResponsePromise, g1ResponsePromise])
    const [noneJson, g3Json, g2Json, g1Json] = 
        await Promise.all([noneResponse.json(), g3Response.json(), g2Response.json(), g1Response.json()])

    const fullTimes = []
    for(let i=0; i < noneJson.length; i++){
        const noneTime = noneJson[noneJson.findIndex(data => data.name === noneJson[i].name)]
        const g3Time = g3Json[g3Json.findIndex(data => data.name === noneJson[i].name)]
        const g2Time = g2Json[g2Json.findIndex(data => data.name === noneJson[i].name)]
        const g1Time = g1Json[g1Json.findIndex(data => data.name === noneJson[i].name)]

        fullTimes.push(
            {
                name: noneJson[i].name,
                noneTime: noneTime ? (noneTime.time/1000).toFixed(1) : 0,
                g3Time: g3Time ? (g3Time.time/1000).toFixed(1) : 0,
                g2Time: g2Time ? (g2Time.time/1000).toFixed(1) : 0,
                g1Time: g1Time ? (g1Time.time/1000).toFixed(1) : 0
            }
        )
    }
    return {
        props: {
            fullTimes: fullTimes
        }
    }
}

export default function Analytics(props) {
    return (
        <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={100} data={props.fullTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis label={{ value: "秒", position: 'insideLeft' }} width={80} />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="noneTime" fill="#472BAB" />
                    <Bar dataKey="g3Time" fill="#4E7CDF" />
                    <Bar dataKey="g2Time" fill="#7e6ac4" />
                    <Bar dataKey="g1Time" fill="#83a3e8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}