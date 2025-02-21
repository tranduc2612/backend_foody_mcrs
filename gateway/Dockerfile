FROM node:18

# Set working directory
WORKDIR /app

# Copy toàn bộ code vào container
COPY ./gateway ./gateway

# Copy `lib` vào container
COPY ./lib ./lib

# Cài đặt dependencies cho `lib`
WORKDIR /app/lib
RUN npm install && npm run build

# Cài đặt dependencies cho `gateway`
WORKDIR /app/gateway
RUN npm install

# Build service code
RUN npm run build

# Expose service port
EXPOSE 3000

# Start the service
CMD ["npm", "run", "start:prod"]
