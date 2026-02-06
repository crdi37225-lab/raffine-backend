# Salon Service Platform Backend

## Project Overview

This is the backend for a Salon Service Platform, allowing users to book home salon services and for local salons/vendors to offer their services. The platform supports multiple user roles (Client, Vendor, Admin) and provides APIs for user management, service listings, booking functionalities, reviews, admin operations, and payment integration.

## Tech Stack

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database for flexible data storage.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
*   **JWT (JSON Web Tokens)**: For user authentication and authorization.
*   **Bcrypt.js**: For password hashing.
*   **Dotenv**: For managing environment variables.
*   **Swagger-jsdoc & Swagger-ui-express**: For generating and serving OpenAPI (Swagger) API documentation.
*   **Multer**: For handling multipart/form-data, primarily for file uploads.

## Features Implemented

The backend provides the following core functionalities:

1.  **User System**:
    *   User registration and login with JWT authentication.
    *   Roles: `client`, `vendor`, `admin`.
    *   User profile management (update common fields like name, phone, address, profile picture).
2.  **Vendor Module**:
    *   Vendor registration, automatically creating an unapproved `VendorProfile`.
    *   Admin approval mechanism for vendors.
    *   Vendor profile details (salon name, description, address, availability, salon logo/images).
    *   Automatic update of vendor average ratings based on reviews.
    *   **Advanced Availability Management**: Weekly recurring availability and specific blocked dates/times.
    *   Endpoint to get available booking slots for a vendor.
3.  **Services Module**:
    *   Add new services (by approved vendors), including service images.
    *   List all available services with search, filter, sort, and pagination options.
    *   Services categorized (Hair, Skin, Nails, Spa, Massage, Other).
4.  **Booking System**:
    *   Create new bookings (by clients).
    *   **Booking Conflict Resolution**: Logic to prevent double bookings based on vendor availability and existing bookings.
    *   Retrieve bookings for the authenticated client with search, filter, sort, and pagination options.
    *   Update booking status (by associated vendor or admin).
5.  **Reviews and Ratings**:
    *   Add reviews for vendors after a completed booking (by clients).
    *   Automatic calculation of vendor's average rating and total ratings.
6.  **Admin Panel API**:
    *   Retrieve all users (Admin only).
    *   Retrieve all bookings (Admin only).
    *   Calculate commissions for all vendors based on completed bookings (Admin only).
7.  **Payments (Simulated)**:
    *   Initiate payment for a booking (client-side simulation).
    *   Handle payment gateway webhooks (public endpoint for status updates).
8.  **Notifications (Simulated)**:
    *   Service for sending email and SMS notifications.
    *   Integrated into booking status updates and new review submissions.
9.  **OpenAPI (Swagger) Documentation**:
    *   Automatically generated API documentation accessible via a web interface.
10. **Image Uploads**:
    *   Generic image upload endpoint (`/api/uploads/image`) using Multer, storing files locally. Placeholder for cloud storage integration (Cloudinary/S3).
    *   Models (`User`, `VendorProfile`, `Service`) updated to store image URLs.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (includes npm).
*   **npm**: Comes with Node.js.
*   **MongoDB**: [Download & Install MongoDB](https://www.mongodb.com/try/download/community) (Community Server). Ensure MongoDB is running as a service or manually before starting the backend.

### Getting Started

1.  **Clone the repository** (or ensure you have the project files in a directory):
    ```bash
    git clone <repository-url>
    cd salon-service-backend
    ```
    *(If you've been working directly with the agent, your project files are already in `C:\Users\pc\salon-service-backend`)*

2.  **Install dependencies**:
    Navigate to the project root directory (`C:\Users\pc\salon-service-backend`) in your terminal and run:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the project root directory (`C:\Users\pc\salon-service-backend`) and add the following content:
    ```dotenv
    MONGO_URI=mongodb://localhost:27017/salon-service
    JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY # IMPORTANT: Change this to a strong, random string
    PORT=5000
    ```
    *   `MONGO_URI`: Your MongoDB connection string. If running locally, `mongodb://localhost:27017/salon-service` is standard.
    *   `JWT_SECRET`: A secret key used for signing JWTs. **Ensure this is a strong, unique, and securely stored value in production.**
    *   `PORT`: The port on which the Express server will run.

4.  **Create Uploads Directory**:
    Ensure the directory for local file uploads exists:
    ```bash
    mkdir -p public/uploads
    ```

5.  **Start the server**:
    In your terminal, from the project root directory, run:
    ```bash
    node server.js
    ```
    You should see messages indicating that MongoDB is connected and the server is running on the specified port.

## API Endpoints

The API is accessible at `http://localhost:5000/api`. Detailed documentation for all endpoints, request/response schemas, and authentication requirements can be found via the Swagger UI.

### Accessing API Documentation

Once the server is running, open your web browser and navigate to:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

This will display the interactive Swagger UI, allowing you to explore all available endpoints.

### Key Endpoints Overview

(For full details, please refer to the Swagger UI at `/api-docs`)

#### **Users (`/api/users`)**
*   `POST /register`: Register a new user (Client, Vendor, or Admin).
*   `POST /login`: Authenticate a user and receive a JWT.
*   `PUT /profile`: (Authenticated User) Update common profile fields.
*   `GET /`: (Admin only) Get a list of all registered users.

#### **Vendors (`/api/vendors`)**
*   `PUT /:id/approve`: (Admin only) Approve a vendor profile. (`:id` is the vendor's user ID).
*   `PUT /profile`: (Vendor only) Update authenticated vendor's profile (e.g., salon name, description).
*   `PUT /availability`: (Vendor only) Update authenticated vendor's weekly availability and blocked dates.
*   `GET /:id/available-slots`: (Public) Get available booking slots for a vendor on a specific date.

#### **Services (`/api/services`)**
*   `POST /`: (Vendor only) Add a new service.
*   `GET /`: (Public) Get all available services with search, filter, sort, and pagination.

#### **Bookings (`/api/bookings`)**
*   `POST /`: (Client only) Create a new booking (includes conflict resolution).
*   `GET /mybookings`: (Client only) Get bookings made by the authenticated client with filter/sort/pagination.
*   `PUT /:id/status`: (Vendor or Admin) Update the status of a specific booking. (`:id` is the booking ID).
*   `GET /`: (Admin only) Get a list of all bookings with filter/sort/pagination.

#### **Reviews (`/api/reviews`)**
*   `POST /`: (Client only) Submit a review for a vendor after a completed booking.

#### **Admin (`/api/admin`)**
*   `GET /commissions`: (Admin only) Calculate and retrieve commission details for all vendors.

#### **Payments (`/api/payments`)**
*   `POST /initiate`: (Client only) Initiate a payment process for a booking.
*   `POST /webhook`: (Public) Endpoint for payment gateway webhooks to update payment status.

#### **Uploads (`/api/uploads`)**
*   `POST /image`: (Authenticated User) Upload an image file (e.g., profile picture, salon image, service image). Returns a URL to the stored image.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.

*   **Register** or **Login** to obtain a JWT.
*   Include the JWT in the `Authorization` header of subsequent requests with the `Bearer` scheme: `Authorization: Bearer <YOUR_JWT_TOKEN>`.

## Roles and Authorization

The system supports three primary roles: `client`, `vendor`, and `admin`.
*   **Client**: Can register, log in, create bookings, view their bookings, initiate payments, and submit reviews. Can update their own user profile.
*   **Vendor**: Can register (requires admin approval to add services), log in, add services, update their `VendorProfile` (salon details, availability), and update the status of their associated bookings.
*   **Admin**: Has full access, can manage users, approve vendors, view all bookings, and access commission reports. Can update user profiles.

Access to routes is controlled using `protect` (authentication) and `authorize` (role-based authorization) middlewares.

## Project Structure

The project follows a modular and layered architecture:

```
salon-service-backend/
├───config/                    # Configuration files (DB connection, Swagger spec)
│   ├───db.js                  # MongoDB connection setup
│   └───swagger.js             # OpenAPI (Swagger) specification definition
├───controllers/               # Request handlers for routes (light business logic)
│   ├───adminController.js
│   ├───bookingController.js
│   ├───paymentController.js
│   ├───reviewController.js
│   ├───serviceController.js
│   ├───uploadsController.js
│   └───userController.js
├───middlewares/               # Express middlewares (authentication, authorization, error handling)
│   ├───authMiddleware.js      # JWT authentication middleware
│   ├───errorMiddleware.js     # Global error handling middleware
│   └───roleMiddleware.js      # Role-based authorization middleware
├───models/                    # Mongoose schemas (data models)
│   ├───Booking.js
│   ├───Review.js
│   ├───Service.js
│   ├───User.js
│   └───VendorProfile.js
├───public/                    # Static files served by Express (e.g., uploaded images)
│   └───uploads/               # Directory for multer uploads
├───routes/                    # API route definitions
│   ├───adminRoutes.js
│   ├───bookingRoutes.js
│   ├───paymentRoutes.js
│   ├───reviewRoutes.js
│   ├───serviceRoutes.js
│   ├───uploadsRoutes.js
│   └───userRoutes.js
├───services/                  # Business logic layer (interacts with models, contains core logic)
│   ├───adminService.js
│   ├───bookingService.js
│   ├───notificationService.js # Placeholder for email/SMS integration
│   ├───paymentService.js      # Placeholder for payment gateway integration
│   ├───reviewService.js
│   ├───serviceService.js
│   ├───uploadsService.js      # Placeholder for cloud storage integration
│   ├───userService.js
│   └───vendorService.js
├───utils/                     # Utility functions (e.g., async error handler, multer config)
│   ├───asyncHandler.js
│   └───multerConfig.js
├───.env                       # Environment variables (create this file)
├───app.js                     # Main Express application setup
├───server.js                  # Application entry point (starts server, connects DB)
└───package.json               # Project dependencies and scripts
```

## Frontend Integration Guidance

This section provides general guidelines for integrating a frontend application (e.g., built with React) with this backend API.

### 1. API Base URL

All API requests should be directed to your backend's base URL, which is typically `http://localhost:5000/api` during development. In production, this will be your deployed backend URL.

### 2. Authentication and Authorization

*   **Login/Register**:
    *   Send `POST` requests to `/api/users/login` or `/api/users/register` with user credentials (email, password, etc.).
    *   Upon successful authentication, the backend will return a JWT (`token`).
*   **Storing the Token**:
    *   Store the JWT securely, typically in `localStorage` or `sessionStorage` in the browser. For React apps, you might use a context provider or a global state management library (like Redux, Zustand) to manage the authentication state.
*   **Sending Authenticated Requests**:
    *   For all protected routes, include the JWT in the `Authorization` header of your HTTP requests. The format should be `Bearer <YOUR_JWT_TOKEN>`.
    *   Use an HTTP client library like `axios` to simplify requests. Example:
        ```javascript
        import axios from 'axios';

        const API_BASE_URL = 'http://localhost:5000/api'; // Or your production URL

        const api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        api.interceptors.request.use((config) => {
            const token = localStorage.getItem('jwtToken'); // Or wherever you store it
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Example Usage:
        // const response = await api.get('/users/profile');
        ```
*   **Error Handling**:
    *   Implement robust error handling for API calls. The backend returns standardized JSON error responses (e.g., `{"message": "Error description", "stack": "..."}`).
    *   Handle `401 Unauthorized` errors by redirecting the user to the login page and clearing any stored tokens.
    *   Handle `403 Forbidden` errors by showing an appropriate message to the user, as they don't have the necessary role.

### 3. API Calls and Data Structure

*   **Refer to Swagger UI**: The primary resource for understanding API endpoints, expected request bodies, and response structures is the Swagger UI at `http://localhost:5000/api-docs`.
*   **JSON Payloads**: All requests and responses for non-file operations use JSON.
*   **File Uploads**:
    *   For image uploads (e.g., to `/api/uploads/image`), the request `Content-Type` should be `multipart/form-data`.
    *   Use `FormData` in JavaScript:
        ```javascript
        const formData = new FormData();
        formData.append('image', yourFileObject); // 'image' must match the field name in multerConfig.js

        const response = await api.post('/uploads/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // The response will contain the imageUrl, which you can then send to update user/vendor/service profiles.
        ```

### 4. Role-Based UI/Access

*   The `token` received upon login contains information about the user, including their `role`.
*   Parse the JWT (e.g., using `jwt-decode` library in frontend) to extract the user's role.
*   Conditionally render UI components or enable/disable features based on the user's role (e.g., Admin dashboard, Vendor-specific forms).

### 5. Frontend Development Best Practices

*   **State Management**: Use a suitable state management solution (Context API, Redux, Zustand, React Query) to manage application state, including authentication status, user data, and fetched API data.
*   **Component-Based Architecture**: Structure your React app into reusable components.
*   **Routing**: Use a library like `react-router-dom` for client-side routing.
*   **Form Handling**: Use libraries like Formik or React Hook Form for efficient form management and validation.

## Deployment Guide

This section outlines general considerations and steps for deploying your Node.js/Express backend application to a production environment.

### 1. Environment Variables

*   **Never hardcode secrets**: Production environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`, and any future API keys for external services like Cloudinary, Stripe) must be set in the deployment environment, not directly in your code or committed `.env` file.
*   **Cloud Provider Configuration**: Most cloud providers (Heroku, Vercel, AWS, Google Cloud, Azure) offer ways to manage environment variables securely.

### 2. Database Setup

*   **Managed MongoDB Service**: For production, use a managed MongoDB service like MongoDB Atlas, AWS DocumentDB, Google Cloud Firestore (or MongoDB Atlas on GCP), etc. This handles scaling, backups, and security.
*   **Connection String**: Update `MONGO_URI` in your production environment variables with the connection string from your managed MongoDB service.

### 3. Server Configuration

*   **Process Manager**: Use a process manager like `PM2` (Node.js Process Manager) or configure your deployment platform to keep your Node.js application running, manage restarts, and monitor performance.
*   **Load Balancing**: For high-traffic applications, consider running multiple instances of your Node.js app behind a load balancer.
*   **HTTPS**: Always use HTTPS in production. Configure SSL/TLS certificates on your server or through a CDN/load balancer.

### 4. Static Files

*   **CDN for Uploads**: For uploaded images (currently stored locally in `public/uploads`), it is highly recommended to integrate with a cloud storage service like Cloudinary, AWS S3, Google Cloud Storage, or Azure Blob Storage. This offers scalability, reliability, and faster content delivery via CDNs.
*   **Update Image Upload Logic**: Modify `services/uploadsService.js` to upload files directly to your chosen cloud storage and return the CDN URL. Update relevant models to store these CDN URLs.
*   **Remove local storage**: Once cloud storage is integrated, `multer` should be configured to upload directly to the cloud, or remove the local storage if not needed. You might still use `public` for other static assets (CSS, JS if not served by frontend build).

### 5. Security Best Practices

*   **JWT Secret Rotation**: Regularly rotate your `JWT_SECRET`.
*   **Input Validation**: Ensure all user inputs are thoroughly validated on the server-side.
*   **Rate Limiting**: Implement rate limiting to protect your API from abuse (e.g., brute-force attacks).
*   **CORS**: Configure CORS policies to only allow requests from your trusted frontend domains.
*   **Helmet**: Use the `helmet` middleware to set various HTTP headers for security.
*   **Sensitive Data**: Never log sensitive user data (passwords, tokens).

### 6. Logging and Monitoring

*   **Centralized Logging**: Use a logging service (e.g., Winston, Pino) and integrate it with a centralized logging platform (e.g., ELK Stack, Loggly, DataDog) to monitor application health and debug issues.
*   **Monitoring Tools**: Utilize monitoring tools provided by your cloud provider or third-party services to track server performance, API response times, and error rates.

### 7. Continuous Integration/Continuous Deployment (CI/CD)

*   Automate your deployment process using CI/CD pipelines (e.g., GitHub Actions, GitLab CI/CD, Jenkins, CircleCI). This ensures consistent and reliable deployments.

---

This `README.md` now includes comprehensive guidance on frontend integration and deployment.
If you have any further questions or specific implementations you'd like to work on, please let me know!