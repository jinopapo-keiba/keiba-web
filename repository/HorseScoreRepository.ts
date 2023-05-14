class HorseScoreRepository{
    async fetchHorseScore(raceId: number): Promise<HorseRecentResult[]>{
        let param = `raceId=${raceId}`
        const response = await fetch(`http://localhost:8080/v1/race/score?${param}`)
        const json = await response.json()
        return json;
    }
}

export default new HorseScoreRepository();