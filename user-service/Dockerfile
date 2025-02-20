# Sử dụng hình ảnh Node.js chính thức
FROM node:20-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependency
COPY package*.json ./

# Cài đặt các dependency
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng NestJS
RUN npm run build

# Expose cổng 3001 cho container
EXPOSE 3002

# Lệnh khởi chạy ứng dụng
CMD ["npm", "run", "start:prod"]