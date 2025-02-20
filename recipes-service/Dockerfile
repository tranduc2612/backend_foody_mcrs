FROM node:18

WORKDIR /app

# Sao chép toàn bộ thư viện `lib` vào container
COPY ../lib ./lib

# Sao chép mã nguồn của service hiện tại vào container
COPY . .

# Cài đặt dependencies của thư viện lib
RUN cd ./lib && npm install && npm run build

# Cài đặt dependencies cho service
RUN npm install

# Start service
CMD ["npm", "run", "start:dev"]