import "./DetailBoard.css"
import StateCard from "../StateCard/StateCard"

function DetailBoard(props: any) {
  return (
    <div className="detail-broad-wrapper">
      <div className="detail-broad-icon-wrapper">
        <h1>🚏</h1>
      </div>
      <div className="detail-broad-title">
        <h1>Report</h1>
        <p>
          I am a great IoT device. I am a great IoT device. I am a great IoT
          device. I am a great IoT device. I am a great IoT device. I am a great
          IoT device.
        </p>
      </div>
      <div className="detail-broad-title">
        <h1>State</h1>
        <div className="states-wrapper">
          <StateCard></StateCard>
          <StateCard></StateCard>
          <StateCard></StateCard>
          <StateCard></StateCard>
          <StateCard></StateCard>
        </div>
      </div>
    </div>
  )
}

export default DetailBoard
