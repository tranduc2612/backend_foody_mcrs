FROM node:18

# Set working directory
WORKDIR /app

# Copy toàn bộ code vào container
COPY ./user-service ./user-service

# Copy `lib` vào container
COPY ./lib ./lib

# Cài đặt dependencies cho `lib`
WORKDIR /app/lib
RUN npm install && npm run build

# Cài đặt dependencies cho `user-service`
WORKDIR /app/user-service
RUN npm install

# Build service code
RUN npm run build

# Script kiểm tra và kill process trên port 3002 (có thể thay đổi port)
RUN apt-get update && apt-get install -y lsof
RUN if lsof -i :3002 ; then kill -9 $(lsof -t -i :3002) ; fi

# Start the service
CMD ["npm", "run", "start:prod"]
