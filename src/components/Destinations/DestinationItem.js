function DestinationItem(props){
  const {item}=props;
  return(
    <>
      <div className="destination__item">
        <a href={`/search?destination=${item.name}`}>
          <img src={item.image} alt={item.name}/>
          <h3>{item.name}</h3>
        </a>
      </div>
    </>
  )
}
export default DestinationItem;