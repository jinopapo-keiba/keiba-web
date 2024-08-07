import { Badge, Card } from "react-bootstrap";

export default function RecommendHorse({recommendHorse,confident}) {
    return (
        <>
            <Card className="m-3">
                <Card.Header>
                    おすすめの馬 {confident.confidentFlag && !confident.buyFlag ? <Badge bg="warning">自信あり</Badge> : ""} {confident.buyFlag ? <Badge bg="danger">買い</Badge> : ""} {confident.chaosFlag ? <Badge bg="info">荒れ</Badge> : ""}
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