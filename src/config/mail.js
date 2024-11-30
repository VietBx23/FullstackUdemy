// config/mail.js
const nodemailer = require("nodemailer");
require("dotenv").config(); // Đảm bảo đọc các thông tin từ tệp .env

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Máy chủ SMTP Gmail
  port: process.env.SMTP_PORT, // Cổng SMTP
  secure: false, // Cổng 587 không sử dụng SSL nhưng vẫn bảo mật với STARTTLS
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email của bạn (ví dụ: vietbx23)
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng hoặc mật khẩu email của bạn
  },
  tls: {
    rejectUnauthorized: false, // Tắt xác thực SSL (để không gặp lỗi khi kết nối)
  },
});

module.exports = transporter;
