function TripItem(props){
  const {item}=props;
  return(
    <>
      <div className="trip__item">
        <img src={item.image} alt={item.name}/>
        <h3>{item.name}</h3>
      </div>
    </>
  )
}
export default TripItem;