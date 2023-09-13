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

Provide detailed information on how to use your API.

### Endpoints

List and describe each API endpoint, including the HTTP method, URL, request body (if applicable), and expected response.

- **Endpoint 1**: Description of the endpoint.
  - Method: GET
  - URL: `/api/endpoint-1`
  - Request Body (if applicable): None
  - Response:
    ```json
    {
      "message": "Response message",
      "data": {
        "field1": "value1",
        "field2": "value2"
      }
    }
    ```

- **Endpoint 2**: Description of the endpoint.
  - Method: POST
  - URL: `/api/endpoint-2`
  - Request Body:
    ```json
    {
      "field1": "value1",
      "field2": "value2"
    }
    ```
  - Response:
    ```json
    {
      "message": "Response message",
      "data": null
    }
    ```
