function DashBoardItem({ title, value, icon, color }) {
  return (
    <>
      <div className="dashboard-panel__item" style={{ backgroundColor: color }}>
        
        <div className="dashboard-panel__item__title">
          <p>{title}</p>
        </div>
        <div className="dashboard-panel__item__value">
          <p>{value}</p>
          <p className="icon">{icon}</p>
        </div>
        <div className="dashboard-panel__item__circle1"></div>
        <div className="dashboard-panel__item__circle2"></div>
      </div>

    </>
  );
}
export default DashBoardItem;
