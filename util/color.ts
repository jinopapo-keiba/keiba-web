export function convertColorByScore(score: number): Color {
    if(score > 65){
        return {color:"fuchsia"}
    }else if(score > 60){
        return {color:"red"}
    }else if(score > 55){
        return {color:"darkorange"}
    }else if(score > 50){
        return {color:"black"}
    }else if(score > 40){
        return {color:"gray"}
    }else{
        return {color:"silver"}
    }
}

export function convertColorByGrade(grade: string): Color {
    if(grade === "G3"){
        return {color:"green"}
    }else if(grade === "G2"){
        return {color:"red"}
    }else if(grade === "G1"){
        return {color:"blue"}
    }else {
        return {color:"black"}
    }
}