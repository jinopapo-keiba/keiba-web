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