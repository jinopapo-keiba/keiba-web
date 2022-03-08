import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function TimeChart(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <div style={{ height: "300px", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={100} data={props.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis label={{ value: "秒", position: 'insideLeft' }} domain={[props.dataMin, 'dataMax']} width={80}/>
                        <XAxis />
                        <Tooltip />
                        <Bar dataKey="time" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}