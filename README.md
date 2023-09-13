# Products Management API

## Table of Contents

1. [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
2. [Database Schema](#database-schema)
    - [Model Design Choices](#model-design-choices)
3. [API Usage](#api-usage)
    - [Endpoints](#endpoints)

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OGFris/product-management-api.git
   cd your-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and configure environment variables, including MONGO_URI and any other required variables.

4. Start the application:

   ```bash
   npm start
   ```

## Database Schema

### Model Design Choices

In this section, we'll explore the design choices made for the database schema and models used in our project.

#### Product Model

- **Name**: Represents the name of the product.
- **Category**: Defines the category to which the product belongs.
- **Price**: Specifies the price of the product.
- **Availability**: Indicates whether the product is currently available.

We chose these fields to capture essential product information for a product management system. The inclusion of `name`, `category`, `price`, and `availability` allows for comprehensive product management and retrieval.

#### Purchase Model

- **Product**: Represents the purchased product, creating a reference to the product model.
- **Date**: Records the date and time of the purchase.
- **User**: Captures the user who made the purchase.

The purchase model is designed to track purchase transactions efficiently. By referencing the product model, we establish a relationship between purchases and products. Storing the date and the user involved allows us to track purchase history and provide valuable insights into user behavior.

## API Usage

In this section, we'll provide details on how to use the API endpoints of our API for product management.

### Endpoints

#### 1. Create a Product

- **Method**: POST
- **URL**: `/api/products`
- **Request Body**:
  - JSON object with the following fields:
    - `name` (string): The name of the product.
    - `category` (string): The category to which the product belongs.
    - `price` (number): The price of the product.
    - `availability` (boolean): Indicates whether the product is available.

- **Response**:
  - HTTP Status: 201 (Created)
  - JSON object representing the created product:
    ```json
    {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Product Category",
      "price": 19.99,
      "availability": true
    }
    ```

#### 2. Get All Products

- **Method**: GET
- **URL**: `/api/products`
- **Response**:
  - HTTP Status: 200 (OK)
  - JSON array containing a list of products:
    ```json
    [
      {
        "_id": "product_id_1",
        "name": "Product 1",
        "category": "Category A",
        "price": 29.99,
        "availability": true
      },
      {
        "_id": "product_id_2",
        "name": "Product 2",
        "category": "Category B",
        "price": 15.99,
        "availability": false
      }
    ]
    ```

#### 3. Get a Product by ID

- **Method**: GET
- **URL**: `/api/products/:productId`
- **Response**:
  - HTTP Status: 200 (OK)
  - JSON object representing the product with the specified ID:
    ```json
    {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Product Category",
      "price": 19.99,
      "availability": true
    }
    ```

#### 4. Update a Product

- **Method**: PUT
- **URL**: `/api/products/:productId`
- **Request Body**:
  - JSON object with fields to update (e.g., `name`, `price`, `availability`).

- **Response**:
  - HTTP Status: 200 (OK)
  - JSON object representing the updated product.

#### 5. Delete a Product

- **Method**: DELETE
- **URL**: `/api/products/:productId`
- **Response**:
  - HTTP Status: 204 (No Content)


#### 6. Purchase a Product

- **Method**: POST
- **URL**: `/api/purchases`
- **Request Body**:
  - JSON object with the following fields:
    - `product` (string): The ID of the purchased product.
    - `user` (string): The ID of the user making the purchase.

- **Response**:
  - HTTP Status: 201 (Created)
  - JSON object representing the created purchase:
    ```json
    {
      "_id": "purchase_id",
      "product": "product_id",
      "user": "user_id",
      "date": "2023-09-15T12:00:00Z"
    }
    ```

#### 7. Purchase Statistics

- **Method**: GET
- **URL**: `/api/purchases/stats`
- **Response**:
  - HTTP Status: 200 (OK)
  - JSON object containing purchase statistics:
    ```json
    {
      "totalPurchases": 50,
      "topSellingProducts": [
        {
          "_id": "product_id_1",
          "name": "Product 1",
          "totalPurchases": 25
        },
        {
          "_id": "product_id_2",
          "name": "Product 2",
          "totalPurchases": 15
        }
      ],
      "purchaseTrends": [
        {
          "date": "2023-09-01",
          "totalPurchases": 5
        },
        {
          "date": "2023-09-02",
          "totalPurchases": 10
        }
      ]
    }
    ```
