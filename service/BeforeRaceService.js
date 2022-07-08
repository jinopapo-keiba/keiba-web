class BeforRaceService {
    async makeBeforeRace() {
        const racesResponse = await fetch("http://localhost:8080/v1/race/before")
        const raceModels = await racesResponse.json()
        let stadiums = [];
        let races = {}
        raceModels.forEach(raceModel => {
            const stadium = raceModel.stadium;
            if(!stadiums.includes(stadium)){
                stadiums.push(stadium)
            }
            if( races[stadium] == undefined ){
                races[stadium] = []
            }
            races[stadium].push({
                round: raceModel.round,
                name: raceModel.raceName,
                id: raceModel.id
            })
        })
        return {
            races: races,
            stadiums: stadiums
        }
    }
}


export default new BeforRaceService()