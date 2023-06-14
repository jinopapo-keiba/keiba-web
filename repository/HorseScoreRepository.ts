class HorseScoreRepository{
    async fetchHorseScore(raceId: number): Promise<HorseRecentResult[]>{
        let param = `raceId=${raceId}`
        const response = await fetch(`http://localhost:8888/v1/score?${param}`,{
            headers : { 
                'Content-Type': 'application/json'}
            })
        const json = await response.json()
        return json;
    }
}

export default new HorseScoreRepository();