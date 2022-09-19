class StadiumRepository {
    async fetchRanStadium(raceId: number,raceLength: number): Promise<string[]>{
        const param = [`raceId=${raceId}`]
        if(raceLength){
            param.push(`raceLength=${raceLength}`)
        }
        const response = await fetch(`http://localhost:8080/v1/stadium/ran?${param.join("&")}`)
        const json = await response.json()
        return json;
    }
}

export default new StadiumRepository()