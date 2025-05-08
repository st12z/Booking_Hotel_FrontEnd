
import { Slider} from "antd";
import { useState } from "react";
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

function SliderRatingComfort(props){
  const {ratingClean,onSetRating,title}=props;
  const value=ratingClean;
  return(
    <>
      <h3 style={{margin:"0"}}>{title}</h3>
      <div className="icon-wrapper">
        <FrownOutlined className={value<=5 ? "icon--active":"icon"} />
        <Slider value={value} onChange={onSetRating} min={0} max={10} className="slide"  />
        <SmileOutlined className={value>5 ? "icon--active":"icon"} />
      </div>
    </>
  )
}
export default SliderRatingComfort;