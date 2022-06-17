import {convertColorByScore} from'../util/color';

export default function ResultColumn(props) {
    return (
        <td>
          <ul>
            <li>出走数:{props.lastRapTime.count}</li>
            <li>フルタイム最速:<span style={convertColorByScore(props.fullTime.devMin)}>{props.fullTime.devMin}</span></li>
            <li>フルタイム平均:<span style={convertColorByScore(props.fullTime.devAvg)}>{props.fullTime.devAvg}</span></li>
            <li>上がり最速:<span style={convertColorByScore(props.lastRapTime.devMin)}>{props.lastRapTime.devMin}</span></li>
            <li>上がり平均:<span style={convertColorByScore(props.lastRapTime.devAvg)}>{props.lastRapTime.devAvg}</span></li>
          </ul>
      </td>
      )
}