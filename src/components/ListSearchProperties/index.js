import PropertyItem from "../PropertyItem/PropertyItem";

function ListSearchProperties(props){
  const {data}=props;
  return(
    <>
      <div className="property">
        {data?.map((item,index)=>(
          <PropertyItem item={item} key={index}/>
        ))}
      </div>
    </>
  )
}
export default ListSearchProperties;