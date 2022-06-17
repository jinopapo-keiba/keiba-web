export function convertColorByScore(score){
    if(score > 60){
        return {color:"fuchsia"}
    }else if(score > 55){
        return {color:"red"}
    }else if(score > 50){
        return {color:"black"}
    }else if(score > 40){
        return {color:"gray"}
    }else{
        return {color:"silver"}
    }
}