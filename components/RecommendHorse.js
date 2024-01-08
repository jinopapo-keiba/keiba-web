import { Card } from "react-bootstrap";

export default function RecommendHorse({recommendHorse}) {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    おすすめの馬
                </Card.Header>
                <Card.Body>
                    <ul>
                        {recommendHorse.map((horse) => <li>単勝率：{horse.score.toFixed(1)}% {horse.frameNumber}枠：{horse.horseName}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </>
    )
}