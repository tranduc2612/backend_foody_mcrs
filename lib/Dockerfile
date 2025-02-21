# Sử dụng Node.js làm base image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build thư viện
RUN npm run build

# Lệnh mặc định (có thể không cần thiết nếu chỉ cần build)
CMD ["npm", "run", "build"]