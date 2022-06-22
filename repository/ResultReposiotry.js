class ResultRepository{
    async fetchResult(raceId) {
        return [{
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
                },
                {}
            ],
            frameNumber: 1,
            name: "ディープインパクト"
        }]
    }
}

export default new ResultRepository();