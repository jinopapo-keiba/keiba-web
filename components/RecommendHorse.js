import { Card } from "react-bootstrap";

export default function RecommendHorse({recommendHorse,confidentFlag}) {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    おすすめの馬 {confidentFlag ? "自信あり" : ""}
                </Card.Header>
                <Card.Body>
                    <ul>
                        {recommendHorse.map((horse) => <li>単勝率：{horse.score.toFixed(1)}% {horse.frameNumber}番：{horse.horseName}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </>
    )
}