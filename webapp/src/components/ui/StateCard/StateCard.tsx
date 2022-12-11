import "./StateCard.css"
function StateCard(props: any) {
  return (
    <div className="state-card-wrapper">
      <div className="state-card">
        <div className="state-color"> </div>
        <div className="state-title">dark</div>
        <div className="state-button-delete">
          <span>X</span>
        </div>
        <div className="state-button-edit">
          <span>✏️</span>
        </div>
      </div>
    </div>
  )
}

export default StateCard
