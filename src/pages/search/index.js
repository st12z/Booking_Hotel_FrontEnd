import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPropertiesBySearch } from "../../service/SearchService";
import { Card, Checkbox, Col, Row, Slider } from "antd";

function Search() {
  const [searchParams] = useSearchParams();
  const searchRequest = {
    destination: searchParams.get("destination"),
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    quantityBeds: searchParams.get("quantityBeds"),
  };
  const dataSearch = {
    total: 9,
    pageNo: 1,
    pageSize: 10,
    dataPage: [
      {
        id: 12,
        name: "Khách sạn & Spa Paradise Center Hà Nội",
        propertyType: "Hotel",
        ratingStar: 4,
        address:
          "22/5 Hang Voi Street, Ly Thai To Ward, Hoan Kiem District, Vietnam, Hoan Kiem, Hanoi, Vietnam",
        latitude: 21.0308041931,
        longitude: 105.8560292112,
        overview:
          "Tọa lạc tại thành phố Hà Nội, cách Nhà hát múa rối nước Thăng Long 400 m, Hanoi Paradise Center Hotel & Spa cung cấp chỗ nghỉ với sảnh khách chung, chỗ đỗ xe riêng, sân hiên và quầy bar. Với dịch vụ mát-xa, khách sạn này nằm gần một số điểm tham quan nổi tiếng, cách Hồ Hoàn Kiếm chưa đầy 1 km, cách Ô Quan Chưởng 12 phút đi bộ và cách trung tâm thương mại Tràng Tiền Plaza chưa đầy 1 km. Chỗ nghỉ có lễ tân 24 giờ, dịch vụ đưa đón sân bay, dịch vụ phòng và WiFi miễn phí. Khách sạn cung cấp phòng nghỉ lắp máy điều hòa với bàn làm việc, ấm đun nước, tủ lạnh, minibar, két an toàn, TV màn hình phẳng và phòng tắm riêng đi kèm chậu rửa vệ sinh (bidet). Các phòng nghỉ tại Hanoi Paradise Center Hotel & Spa được trang bị đồ vệ sinh cá nhân miễn phí và ổ cắm cho iPod. Chỗ nghỉ phục vụ bữa sáng tự chọn, gọi món hoặc bữa sáng đầy đủ kiểu Anh/Ailen. Tại chỗ nghỉ, du khách sẽ tìm thấy nhà hàng phục vụ ẩm thực châu Phi, Mỹ và Argentina. Du khách cũng có thể yêu cầu các lựa chọn không có sữa, halal và kosher. Khu vực này nổi tiếng với hoạt động đạp xe và dịch vụ cho thuê xe đạp có tại khách sạn 4 sao này. Nhà hát lớn Hà Nội cách Hanoi Paradise Center Hotel & Spa 1,1 km, Nhà thờ lớn Hà Nội cách đó 1,2 km. Sân bay quốc tế Nội Bài cách đó 24 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/219028902.jpg?k=28c35961b941d825304d44408f7d3febc5cef6b07b2fa02bb76ab344f3c770f9&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/346331803.jpg?k=733d085b359c0ab7999804865dfef5f2151dcf2e3128082c7306ea9907ca9f26&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/346327027.jpg?k=facc13e29dc3641aa944090d14892f8755be858763da9789c0d4fc523d39fe8a&o=",
        ],
        slug: "khach-san-spa-paradise-center-ha-noi",
        numReviews: 1000,
        avgReviewScore: 8.8,
        deleted: false,
        distanceFromCenter: 2.3745114092899997,
        distanceFromTrip: null,
      },
      {
        id: 5,
        name: "Fuji Apartment 2",
        propertyType: "Apartment",
        ratingStar: 3,
        address: "165/49 Dương Quảng Hàm, Cau Giay, 122000 Hanoi, Vietnam",
        latitude: 21.0364141875,
        longitude: 105.7987246806,
        overview:
          "Nằm trong bán kính 1 km từ Bảo tàng Dân tộc học Việt Nam và 2,8 km từ trung tâm thương mại Vincom Center Nguyễn Chí Thanh, Fuji Apartment 2 cung cấp các phòng nghỉ với máy lạnh và phòng tắm riêng tại thành phố Hà Nội. Chỗ nghỉ này cách Chùa Một Cột khoảng 4,1 km, Bảo tàng Mỹ thuật Việt Nam 4,2 km và Văn Miếu - Quốc Tử Giám 4,3 km. Lăng Chủ tịch Hồ Chí Minh cách đó 4,7 km và Hoàng thành Thăng Long cách căn hộ 4,9 km. Tất cả các phòng nghỉ trong khu phức hợp căn hộ đều được trang bị máy pha cà phê. Với phòng tắm riêng được trang bị chậu rửa vệ sinh (bidet) và dép đi trong nhà, các phòng nghỉ tại khu phức hợp căn hộ cũng có WiFi miễn phí trong khi một số phòng nghỉ có sân hiên. Mỗi phòng nghỉ tại khu phức hợp căn hộ đều được trang bị khăn trải giường và khăn tắm. Đền Quán Thánh cách căn hộ 5,3 km trong khi Sân vận động Mỹ Đình cách đó 5,6 km. Sân bay quốc tế Nội Bài cách đó 23 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/663320174.jpg?k=3562b6a569ec2ea83f58bcb94ce4b2d9f9d9b6d7af44b4537f1422444afb2523&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/663325273.jpg?k=9e55413fd1adeb890e3d5bf2459af7c86f6812a0367206fa09018b8f5d78f863&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/651462844.jpg?k=bcc722b74b35e7162563649672213eb77be8541a7a7fb009b86abb3d49ddba35&o=",
        ],
        slug: "fuji-apartment-2",
        numReviews: 1000,
        avgReviewScore: 5.4,
        deleted: false,
        distanceFromCenter: 1138.4362720725399,
        distanceFromTrip: null,
      },
      {
        id: 11,
        name: "The Flower Boutique Hotel & Travel",
        propertyType: "Villa",
        ratingStar: 4,
        address: "055 Nguyễn Trường Tộ, Ba Dinh, Hanoi, Vietnam\n",
        latitude: 21.0423790618,
        longitude: 105.8456573112,
        overview:
          "Tọa lạc tại vị trí hấp dẫn ở quận Ba Đình của thành phố Hà Nội, The Flower Boutique Hotel & Travel nằm cách Đền Quán Thánh 1,2 km, cách Ô Quan Chưởng 1,1 km và cách Lăng Chủ tịch Hồ Chí Minh 1,7 km. Khách sạn 4 sao này có bàn đặt tour và chỗ để hành lý. Chỗ nghỉ có lễ tân 24 giờ, dịch vụ đưa đón sân bay, dịch vụ trợ giúp đặc biệt và WiFi miễn phí. Khách sạn cung cấp phòng nghỉ gắn máy điều hòa với bàn làm việc, ấm đun nước, tủ lạnh, minibar, két an toàn, TV màn hình phẳng và phòng tắm riêng đi kèm chậu rửa vệ sinh (bidet). Các phòng nghỉ đều có tủ quần áo. Du khách có thể thưởng thức bữa sáng tự chọn, gọi món hoặc kiểu lục địa tại chỗ nghỉ. Các điểm tham quan nổi tiếng gần The Flower Boutique Hotel & Travel bao gồm Hồ Tây, Nhà hát múa rối nước Thăng Long và Hoàng thành Thăng Long. Sân bay quốc tế Nội Bài cách chỗ nghỉ 22 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/416041038.jpg?k=5b30cb6cf5bcc3640c46afed65a8afc7f438757ea73149e92df49fc64aaf2459&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/416041019.jpg?k=86389e217eb327b24bd5ef541c54caf129a14f250f7f31d15e8b3e127326e6b3&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/416040625.jpg?k=ea85fa54b7b8454b00e445f5e2c14f9c428f0bbc1bbe7f5ed30e7a764c9c3d06&o=",
        ],
        slug: "the-flower-boutique-hotel-travel",
        numReviews: 1000,
        avgReviewScore: 6.3,
        deleted: false,
        distanceFromCenter: 1.51839338927,
        distanceFromTrip: null,
      },
      {
        id: 7,
        name: "25's homestay",
        propertyType: "Homestay",
        ratingStar: 2,
        address: "26 Phố Vạn Phúc, Ba Dinh, 100000 Hanoi, Vietnam",
        latitude: 21.0283390514,
        longitude: 105.8392981152,
        overview:
          "Tọa lạc tại quận Ba Đình của thành phố Hà Nội, 25's homestay có máy lạnh, sân hiên và tầm nhìn ra khu vườn. Chỗ nghỉ này cách trung tâm thương mại Vincom Center Nguyễn Chí Thanh 1,8 km và có thang máy. Căn hộ cũng có WiFi miễn phí, chỗ đỗ xe riêng miễn phí và tiện nghi cho khách khuyết tật. Căn hộ có 1 phòng ngủ, TV màn hình phẳng với dịch vụ phát trực tuyến, bếp đầy đủ tiện nghi với máy rửa chén và lò nướng, máy giặt và 1 phòng tắm đi kèm chậu rửa vệ sinh (bidet). Căn hộ này cũng có ban công kiêm khu vực ăn uống ngoài trời. Phòng thay đồ, dịch vụ giặt là và an ninh 24 giờ cũng có sẵn. Du khách có thể thư giãn trong khu vườn tại chỗ nghỉ. Chùa Một Cột cách căn hộ 2,1 km trong khi Lăng Chủ tịch Hồ Chí Minh cách đó 2,7 km. Sân bay quốc tế Nội Bài cách chỗ nghỉ 23 km và chỗ nghỉ cung cấp dịch vụ đưa đón sân bay có tính phí.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/660976477.jpg?k=01145d915af7016dba4f46bd3e5b5251d6693b510f1125292cd57c93639db467&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/660976390.jpg?k=c2902d4bc6c2b83390a9aab3946dbf3f7c71cf5fdb57f5acb99ee4092bc120d6&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/660976404.jpg?k=231d0d084a5cb1a0597722e711b1f0ee6e42588897549cd1d23626fb3848357c&o=",
        ],
        slug: "25s-homestay",
        numReviews: 1000,
        avgReviewScore: 8.3,
        deleted: false,
        distanceFromCenter: 1.8396745567200001,
        distanceFromTrip: null,
      },
      {
        id: 8,
        name: "Granda Central Apartment",
        propertyType: "Apartment",
        ratingStar: 3,
        address:
          "Lot A14/D21, Lane 100, Dich Vong Hau Street, Cau Giay District, Hanoi, Cau Giay, Hanoi, Vietnam",
        latitude: 21.0291945805,
        longitude: 105.7843757959,
        overview:
          "Nằm trong bán kính 2,6 km từ Bảo tàng Dân tộc học Việt Nam và 4,2 km từ Sân vận động Mỹ Đình tại thành phố Hà Nội, Granda Central Apartment cung cấp chỗ nghỉ với bếp. Cả WiFi miễn phí và chỗ đỗ xe trong khuôn viên đều được cung cấp miễn phí tại khách sạn căn hộ này. Khách sạn căn hộ này có các phòng gia đình. Khách sạn căn hộ này cung cấp cho khách các phòng nghỉ lắp máy điều hòa với bàn làm việc, ấm đun nước, lò vi sóng, tủ lạnh, két an toàn, TV màn hình phẳng và phòng tắm riêng đi kèm chậu rửa vệ sinh (bidet). Tất cả các phòng nghỉ tại khách sạn căn hộ này đều không gây dị ứng và cách âm. Tất cả các phòng nghỉ tại khách sạn căn hộ này đều có ga trải giường và khăn tắm. Trung tâm thương mại Vincom Center Nguyễn Chí Thanh cách Granda Central Apartment 4,4 km trong khi Bảo tàng Mỹ thuật Việt Nam cách đó 6,8 km. Sân bay quốc tế Nội Bài cách đó 25 km và khách sạn cung cấp dịch vụ đưa đón sân bay có tính phí.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/149537773.jpg?k=eff368e14c293cd3d77a57e75a55ec3214ddeaf131f8c74af260349e3d95302c&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/149537628.jpg?k=277b27d68054d14fc4388c55b4e0fa94ff5d7d777f96baf8dd8164c19b3e57d2&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/149537775.jpg?k=d3531a10265bdc3987ba08d147d1d72bf4529f6c2b452e167e4c43363d518d84&o=",
        ],
        slug: "granda-central-apartment",
        numReviews: 1000,
        avgReviewScore: 5.6,
        deleted: false,
        distanceFromCenter: 5.97557202768,
        distanceFromTrip: null,
      },
      {
        id: 9,
        name: "Amanda Boutique Hotel & Travel",
        propertyType: "Hotel",
        ratingStar: 5,
        address: "62E Phố Cầu Gỗ, Hoan Kiem, Hanoi, Vietnam",
        latitude: 21.0325057039,
        longitude: 105.8525204517,
        overview:
          "Tọa lạc tại vị trí hấp dẫn ở trung tâm thành phố Hà Nội, Amanda Boutique Hotel & Travel nằm trong bán kính 100 m từ Nhà hát múa rối nước Thăng Long và 600 m từ Hồ Hoàn Kiếm. Khách sạn 3 sao này có nhà hàng và các phòng nghỉ lắp máy điều hòa với WiFi miễn phí, mỗi phòng đều đi kèm phòng tắm riêng. Chỗ nghỉ cung cấp dịch vụ phòng, lễ tân 24 giờ và dịch vụ thu đổi ngoại tệ cho khách. Tất cả các phòng đều được trang bị tủ lạnh, minibar, ấm đun nước, chậu rửa vệ sinh (bidet), đồ vệ sinh cá nhân miễn phí và tủ quần áo. Các phòng được trang bị TV màn hình phẳng và một số phòng tại khách sạn có tầm nhìn ra quang cảnh thành phố. Khách sạn phục vụ bữa sáng tự chọn, kiểu lục địa hoặc kiểu Á. Các điểm tham quan nổi tiếng gần Amanda Boutique Hotel & Travel bao gồm Ô Quan Chưởng, trung tâm thương mại Tràng Tiền Plaza và Nhà hát Lớn Hà Nội. Sân bay quốc tế Nội Bài cách chỗ nghỉ 24 km và chỗ nghỉ cung cấp dịch vụ đưa đón sân bay có tính phí.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/650206950.jpg?k=c69cb7117de33d77ffb71333bae089d663c1fc9774e347e56f1c14fd4ea43839&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/651181660.jpg?k=dc954edcadb050d900f108a4e27826ad86f8058bccfb9cb55bb640bf1b47093a&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/625876441.jpg?k=ebe9a9d97a1ebcc5fad3ad3c4195b303dfeff462d4278e9bdbcb817625b2ba48&o=",
        ],
        slug: "amanda-boutique-hotel-travel",
        numReviews: 1000,
        avgReviewScore: 6.3,
        deleted: false,
        distanceFromCenter: 1.3539715149,
        distanceFromTrip: null,
      },
      {
        id: 10,
        name: "Peaceful Corner in Old Quarter",
        propertyType: "Villa",
        ratingStar: 3,
        address: "3 Phố Phan Huy Ích 6, Ba Dinh, 100000 Hanoi, Vietnam",
        latitude: 21.0325790608,
        longitude: 105.850038731,
        overview:
          "Peaceful Corner in Old Quarter là một căn hộ nằm tại quận Ba Đình của thành phố Hà Nội. Du khách có thể vào căn hộ qua lối vào riêng. Tất cả các phòng trong khu phức hợp căn hộ đều được trang bị ấm đun nước. Với phòng tắm riêng đi kèm góc tắm vòi sen và dép, các phòng tại khu phức hợp căn hộ cũng có WiFi miễn phí. Các phòng được trang bị tiện nghi sưởi ấm. Sân bay quốc tế Nội Bài cách chỗ nghỉ 22 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/651974535.jpg?k=d4c6d30e95e4a3311c063ed78e2ffc444d31cf54bb94a4e49fb325039bd82142&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/652416172.jpg?k=76b6e4131a8ba886d8abbf85c43bcd53bd202f38665fd6e48bd6a4a3ddafccb8&o=",
        ],
        slug: "peaceful-corner-in-old-quarter",
        numReviews: 600,
        avgReviewScore: 7.4,
        deleted: false,
        distanceFromCenter: 1.3539715149,
        distanceFromTrip: null,
      },
      {
        id: 6,
        name: "Sao Mai Boutique Hotel",
        propertyType: "Hotel",
        ratingStar: 4,
        address: "23 Ngõ Thông Phong, Dong Da, 67337 Hanoi, Vietnam",
        latitude: 21.0260560965,
        longitude: 105.8342878094,
        overview:
          "Tọa lạc tại thành phố Hà Nội, cách Bảo tàng Mỹ thuật Việt Nam 800 m, Sao Mai Boutique Hotel cung cấp chỗ nghỉ với xe đạp cho khách sử dụng miễn phí, chỗ đỗ xe riêng miễn phí, sảnh khách chung và sân hiên. Khách sạn 4 sao này cung cấp dịch vụ trợ giúp đặc biệt và bàn đặt tour. Chỗ nghỉ cung cấp dịch vụ lễ tân 24 giờ, dịch vụ đưa đón sân bay, dịch vụ phòng và WiFi miễn phí trong toàn bộ khuôn viên. Mỗi phòng nghỉ tại khách sạn đều được trang bị máy điều hòa, khu vực ghế ngồi, TV màn hình phẳng với các kênh truyền hình vệ tinh, bếp nhỏ, khu vực ăn uống, két an toàn và phòng tắm riêng với chậu rửa vệ sinh (bidet), đồ vệ sinh cá nhân miễn phí cùng máy sấy tóc. Tất cả các phòng đều được trang bị ấm đun nước trong khi một số phòng chọn lọc có ban công và những phòng khác cũng cung cấp cho khách tầm nhìn ra quang cảnh thành phố. Tất cả các phòng đều được trang bị tủ lạnh. Chỗ nghỉ phục vụ bữa sáng tự chọn, kiểu lục địa hoặc kiểu Mỹ. Tại Sao Mai Boutique Hotel, du khách sẽ tìm thấy nhà hàng phục vụ ẩm thực Trung Quốc, Việt Nam và Châu Á. Du khách cũng có thể yêu cầu lựa chọn ăn chay. Các điểm tham quan nổi tiếng gần chỗ nghỉ bao gồm Văn Miếu - Quốc Tử Giám, Lăng Chủ tịch Hồ Chí Minh và Hoàng thành Thăng Long. Sân bay quốc tế Nội Bài cách đó 24 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/628127287.jpg?k=08e5124830a453f4a2045f6d1d2b05bc6634515fd3258777546aadb873eb95c7&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/628120696.jpg?k=8f7a73d200471fc842798c457fae9be06552b98e08c13f197a9173aff54accb2&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/633128136.jpg?k=74502b77f71c00502450c09962a396b120ee2f36802b12bf0e12a3e4a761312b&o=",
        ],
        slug: "sao-mai-boutique-hotel",
        numReviews: 1000,
        avgReviewScore: 8.3,
        deleted: false,
        distanceFromCenter: 0.84040935374,
        distanceFromTrip: null,
      },
      {
        id: 13,
        name: "Investland in Truc Bach & serviced apartment",
        propertyType: "Apartment",
        ratingStar: 2,
        address: "24 Lac Chinh, Ba Dinh, Ba Dinh, Hanoi, Vietnam\n",
        latitude: 21.0461749645,
        longitude: 105.8415568266,
        overview:
          "Với tầm nhìn ra khu vườn, Investland in Truc Bach & serviced apartment là chỗ nghỉ nằm tại thành phố Hà Nội, cách Đền Quán Thánh 1,1 km và cách Hồ Tây chưa đến 1 km. Căn hộ cung cấp miễn phí cả WiFi và chỗ đỗ xe trong khuôn viên. Chỗ nghỉ có thang máy và dịch vụ giặt khô cho khách. Căn hộ lắp máy điều hòa này bao gồm 1 phòng ngủ, phòng khách, bếp đầy đủ tiện nghi với lò vi sóng cùng ấm đun nước và 1 phòng tắm đi kèm bồn tắm cùng dép. TV màn hình phẳng với các kênh truyền hình cáp cũng có sẵn. Dịch vụ giặt là cũng được cung cấp. Các điểm tham quan nổi tiếng gần Investland in Truc Bach & serviced apartment bao gồm Lăng Chủ tịch Hồ Chí Minh, Hoàng thành Thăng Long và Ô Quan Chưởng. Sân bay quốc tế Nội Bài cách chỗ nghỉ 22 km.",
        facilities: [
          '"Wi-Fi miễn phí"',
          '"Bể bơi ngoài trời"',
          '"Bể bơi trong nhà"',
          '"Trung tâm thể dục"',
          '"Nhà hàng"',
          '"Quầy bar"',
          '"Dịch vụ phòng 24/7"',
          '"Lễ tân 24/7"',
          '"Bãi đỗ xe miễn phí"',
          '"Dịch vụ đưa đón sân bay"',
          '"Phòng không hút thuốc"',
          '"Phòng gia đình"',
          '"Dịch vụ giặt là"',
          '"Spa & chăm sóc sức khỏe"',
          '"Máy lạnh"',
          '"Két an toàn"',
          '"Tivi màn hình phẳng"',
          '"Máy pha cà phê"',
          '"Bàn làm việc"',
          '"Ban công riêng"',
          '"View biển"',
          '"Bữa sáng miễn phí"',
        ],
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/499949834.jpg?k=c4c46d5a6ccf0f4c1a0617f28d87830ae56f5040b4a26f355b59ca423f428c7d&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max500/502442581.jpg?k=798cba3e5b0977eaafc979a5fd099d7adcd1e1c549c1e18dd35e688e1cf33c7b&o=",
          "https://cf.bstatic.com/xdata/images/hotel/max300/502442619.jpg?k=ff83c3618b248f44d6ea1daa85fd60afedb5f68408203ed0f7c66d7418c6677d&o=",
        ],
        slug: "investland-in-truc-bach-serviced-apartment",
        numReviews: 1000,
        avgReviewScore: 7.8,
        deleted: false,
        distanceFromCenter: 1.89359157153,
        distanceFromTrip: null,
      },
    ],
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getPropertiesBySearch(
          `destination=${searchRequest.destination}&checkIn=${searchRequest.checkIn}&checkOut=${searchRequest.checkOut}&quantityBeds=${searchRequest.quantityBeds}`
        );
        if (res.code == 200) {
          console.log(res.searchRequest);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [searchRequest.destination, searchRequest.checkIn, searchRequest.checkOut, searchRequest.quantityBeds]);
  const handleChange=(e)=>{
    console.log(e);
  }
  return(
    <>
      <Row gutter={[20,20]}>
        <Col span={6}>
          <div className="map">
            <img src="https://th.bing.com/th/id/OIP.-TMzwF-Nx7xrhvOdXqXp7QHaGR?rs=1&pid=ImgDetMain" style={{width:"200px"}}/>
          </div>
          <Card title="Bộ lọc" style={{ width: 250 }}>
            <div className="filter">
              <div className="filter__budget">
                <h3 style={{margin:0,marginBottom:"50px"}}>Tài chính của bạn</h3>
                <Slider 
                  defaultValue={500000} 
                  max={5000000} 
                  step={50000} 
                  tooltip={{ 
                    open: true, 
                    formatter: (value) => `${value.toLocaleString()} VND` 
                  }} 
                  onChange={handleChange}
                />
              </div>
              <div className="filter__popular">
                <h3>Phổ biến</h3>
                <Checkbox>Checkbox</Checkbox>
                <Checkbox>Checkbox</Checkbox>
                <Checkbox>Checkbox</Checkbox>
                <Checkbox>Checkbox</Checkbox>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={18}>

        </Col>
      </Row>
    </>
  )
}
export default Search;
