# 🏨 Booking Hotel - Frontend

## 📌 Giới thiệu dự án

**Booking Hotel Frontend** là giao diện người dùng của hệ thống đặt phòng khách sạn, được xây dựng bằng **ReactJS** với thiết kế hiện đại, responsive, tích hợp đầy đủ các tính năng:

- Đăng ký, đăng nhập, xác thực người dùng thông qua **Keycloak**
- Tìm kiếm và lọc phòng theo nhu cầu
- Xem chi tiết phòng và đặt phòng trực tuyến
- Gửi đánh giá và nhận xét sau khi đặt
- Tích hợp thanh toán VNPAY
- Thông báo và nhắn tin realtime qua WebSocket
- Giao diện quản trị dành cho admin với chức năng thống kê, phân quyền, xuất Excel,...

Frontend tương tác với hệ thống backend microservice thông qua API Gateway và cập nhật dữ liệu realtime từ server.

---

## 🛠️ Công nghệ sử dụng

Dựa theo `package.json`, frontend sử dụng các thư viện và công nghệ sau:

### 🔷 Ngôn ngữ & Framework
- **React 19** – Thư viện JavaScript chính để xây dựng UI
- **React Router v7** – Điều hướng route động
- **Redux + Redux Persist** – Quản lý trạng thái toàn cục, lưu vào localStorage
- **SASS** – CSS tiền xử lý, giúp viết style có cấu trúc hơn

### 🎨 UI & Hiển thị
- **Ant Design (v5)** – Bộ UI component mạnh mẽ
- **Framer Motion** – Hiệu ứng chuyển động mượt mà
- **Swiper** – Hiển thị slider ảnh phòng hoặc banner
- **React Icons** – Thư viện biểu tượng phong phú

### 🗓️ Xử lý thời gian
- **Day.js** & **Moment.js** – Format và xử lý thời gian

### 🔒 Xác thực & Token
- **jwt-decode** – Giải mã token JWT từ Keycloak

### 📤 Upload & Soạn thảo nội dung
- **file-upload-with-preview** – Giao diện upload ảnh người dùng/phòng
- **TinyMCE + tinymce-react** – Trình soạn thảo văn bản HTML (mô tả phòng, nội dung tin nhắn)

### 📊 Biểu đồ & Dashboard
- **@ant-design/charts** & **@ant-design/plots** – Vẽ biểu đồ thống kê trong trang admin

### 💬 WebSocket & Giao tiếp realtime
- **sockjs-client + @stomp/stompjs** – Kết nối WebSocket để nhắn tin, thông báo realtime

### 😊 Tương tác nâng cao
- **emoji-picker-react** – Chèn emoji vào khung chat
- **node-emoji** – Xử lý emoji trong nội dung văn bản

### 🧪 Testing
- **@testing-library/react** – Viết test cho component
- **@testing-library/jest-dom** – Hỗ trợ assertion trực quan
- **@testing-library/user-event** – Giả lập hành vi người dùng trong test

---

## 🌐 Đường dẫn triển khai

Frontend đã được deploy trên **Vercel** tại địa chỉ:

🔗 [https://booking-hotel-front-end.vercel.app/](https://booking-hotel-front-end.vercel.app/)

