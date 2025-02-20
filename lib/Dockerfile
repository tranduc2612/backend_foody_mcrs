# Dockerfile mẫu cho các service
FROM node:18

WORKDIR /app

# Sao chép thư viện lib vào container
COPY ./lib ./lib

# Sao chép mã nguồn service vào container
COPY . .

# Cài đặt thư viện lib
RUN cd ./lib && npm install && npm run build

# Cài đặt các dependencies cho service
RUN npm install

# Start service
CMD ["npm", "run", "start:dev"]