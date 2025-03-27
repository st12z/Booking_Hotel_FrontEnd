function DestinationItem(props){
  const {item}=props;
  return(
    <>
      <div className="destination__item">
        <img src={item.image} alt={item.name}/>
        <h3>{item.name}</h3>
      </div>
    </>
  )
}
export default DestinationItem;