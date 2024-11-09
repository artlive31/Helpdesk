# Description: Dockerfile for the Node.js application to run in a container environment.
FROM node:14
# กำหนดโฟลเดอร์ที่จะใช้ในการทำงาน ในที่นี้คือ /usr/src/app 
WORKDIR /usr/src/app
# คัดลอกไฟล์ package.json และ package-lock.json ไปยังโฟลเดอร์ /usr/src/app
COPY package*.json ./
# ติดตั้ง package ที่ระบุในไฟล์ package.json โดยใช้คำสั่ง npm install
RUN npm install
# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบันไปยังโฟลเดอร์ /usr/src/app ใน Docker container 
COPY . .
# กำหนด port ที่จะใช้ในการเชื่อมต่อ ในที่นี้คือ 3000 
EXPOSE 5001
# คำสั่งที่จะใช้ในการรัน Node.js application ใน Docker container 
CMD [ "node", "app.js" ]