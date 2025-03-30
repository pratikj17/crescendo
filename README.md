# Web-Based Portal with Role-Based Access, File Uploads, and Service Bus

## 📌 Project Overview
This repository contains a **web-based portal** designed with **role-based access control**, **AWS S3 file uploads**, and **service bus integration** to manage communication between services efficiently.

## 📂 Branches Overview
The repository consists of the following branches:

1. **Auth** - Implements **role-based access control (RBAC)** to manage user permissions.
2. **Upload** - Handles **file uploads** using **AWS S3**, allowing users to upload and download files securely.
3. **service_bus** - Handles message queuing and notifications, ensuring efficient communication between different services.
4. **Frontend** - Frontend for **role-based auth** and **file uploads**.
5. **AI_validator** - AI for assignment validation.

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/yourusername/your-repo.git
 cd your-repo
```

### **2️⃣ Switch to the Desired Branch**
```sh
 git checkout <branch-name> # Replace with 'auth', 'upload', or 'frontend'
```

## 🔑 Authentication & Role-Based Access (**auth branch**)
- Implements JWT-based authentication.
- Supports **Admin, Trainer, and Student** roles.
- Middleware restricts access to protected routes.

### **Setup Environment Variables**
Create a `.env` file and add:
```sh
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```

### **Run the Authentication Service**
```sh
npm install  # Install dependencies
npm run dev    # Start the server
```

## ☁️ File Upload System (**upload branch**)
- Uses **Multer-S3** to handle file uploads.
- Supports **role-based access for file uploads/downloads**.
- Generates **pre-signed URLs** for secure file access.

### **Setup AWS Credentials**
Create a `.env` file with:
```sh
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

### **Run the Frontend**
```sh
npm install
npm run dev
```

## 📡 Service Bus Integration (**service_bus branch**)
- Implements **message queuing** and **scheduling** for event-driven communication.
- Ensures **efficient processing** between microservices.

## 🎯 API Endpoints
### **Authentication (auth branch)**
| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| POST   | /api/v1/student| Register a new student |
| POST   | /api/v1/trainer| Register a new trainer |
| POST   | /api/v1/admin  | Admin Login            |



### **File Uploads (upload branch)**
| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | /files/upload           | Upload a file to S3      |
| GET    | /files/download/:fileKey| Generate download URL    |

## AI Validator
- Used to check the assignment format uploaded by student using LLM
- Also displays the issues in the uploaded assignment

