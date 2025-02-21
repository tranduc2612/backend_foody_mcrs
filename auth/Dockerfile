FROM node:18

# Set working directory
WORKDIR /app

# Copy toàn bộ code vào container
COPY ./auth ./auth

# Copy `lib` vào container
COPY ./lib ./lib

# Cài đặt dependencies cho `lib`
WORKDIR /app/lib
RUN npm install && npm run build

# Cài đặt dependencies cho `auth`
WORKDIR /app/auth
RUN npm install

# Build service code
RUN npm run build

# Start the service
CMD ["npm", "run", "start:prod"]
