
# Payment Microservice

This repository contains the implementation of a Payment Microservice using gRPC. The microservice interfaces with an Authentication Microservice to verify user credentials before processing payments.

## Prerequisites

- **Node.js** (v12.10.0 or higher)
- **npm** (Node Package Manager)
- **Git**

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Navneet9968/paymentMicroservice.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

## Project Structure

- **`payment.proto`**: Protocol Buffers definition for the Payment Service.
- **`auth.proto`**: Protocol Buffers definition for the Authentication Service.
- **`server.js`**: gRPC server implementation for the Payment Service.
- **`client.js`**: gRPC client setup for both Payment and Authentication Services.
- **`nodeServer.js`**: HTTP server that acts as a bridge between HTTP clients and the gRPC services.
- **`test.js`**: Script to test the Payment Service.
- **`package.json`**: Project metadata and dependencies.
- **`package-lock.json`**: Lockfile for dependencies.

## Running the Services

### Step 1: Start the gRPC Server

Start the gRPC server for the Payment Service:

   ```sh
   node server.js
   ```

You should see the following output indicating that the server is running:

```
Server running at http://127.0.0.1:50051
```

### Step 2: Start the HTTP Server

Start the HTTP server that acts as a bridge between HTTP clients and the gRPC services.

   ```sh
   node nodeServer.js
   ```

You should see the following output indicating that the server is running.

### Step 3: Test the Payment Service

Run the `test.js` script to test the Payment Service.

   ```sh
   node test.js
   ```

This script will perform the following operations:

- **Create a payment**
- **Get a payment**
- **List all payments**
- **Delete a payment**

## API Endpoints

### Payment Service

1. **CreatePayment**
   - **Request**: `CreatePaymentRequest`
   - **Response**: `CreatePaymentResponse`

2. **GetPayment**
   - **Request**: `GetPaymentRequest`
   - **Response**: `GetPaymentResponse`

3. **ListPayments**
   - **Request**: `Empty`
   - **Response**: `PaymentList`

4. **DeletePayment**
   - **Request**: `PaymentId`
   - **Response**: `Empty`

```
