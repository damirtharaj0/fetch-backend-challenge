# Fetch Backend Internship Challenge

This project is a REST API to track points and point transactions for a single user, categorized by payers. The API allows for adding points, spending points, and fetching the current balance, with each transaction tracked by a payer and timestamp.

### Technologies Used
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework to build RESTful APIs.
- **JavaScript**: Main language used to implement the API.
- **Sqlite**: Datatabse to store payers.
- **Drizzle ORM**: ORM for sql queries.

## Installation

1. **Clone the repository**:

    ```bash
    git clone [https://github.com/damirtharaj0/fetch-backend-internship.git](https://github.com/damirtharaj0/fetch-backend-challenge.git)
    ```

2. **Navigate to the project directory**:

    ```bash
    cd fetch-backend-internship
    ```

3. **Install dependencies**:

    Make sure you have [Node.js](https://nodejs.org/en/) installed. Then, install project dependencies:

    ```bash
    npm install
    ```

## Usage

1. **Start the server**:

    To start the Express server, run:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:8000` by default.

2. **Test the API**:

    You can interact with the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## API Endpoints

### 1. Add Points

- **Route**: `/add`
- **Method**: POST
- **Description**: Adds points to a payer's balance with a timestamp.
- **Request Body Example**:
    ```json
    {
      "payer": "DANNON",
      "points": 5000,
      "timestamp": "2020-11-02T14:00:00Z"
    }
    ```
- **Response**: `200 OK` on success.

### 2. Spend Points

- **Route**: `/spend`
- **Method**: POST
- **Description**: Deducts points using the oldest available points first.
- **Request Body Example**:
    ```json
    {
      "points": 5000
    }
    ```
- **Response Example**:
    ```json
    [
      { "payer": "DANNON", "points": -100 },
      { "payer": "UNILEVER", "points": -200 },
      { "payer": "MILLER COORS", "points": -4700 }
    ]
    ```
- **Error**: If insufficient points, responds with a `400` status and an error message.

### 3. Get Points Balance

- **Route**: `/balance`
- **Method**: GET
- **Description**: Returns the user's current points balance per payer.
- **Response Example**:
    ```json
    {
      "DANNON": 1000,
      "UNILEVER": 0,
      "MILLER COORS": 5300
    }
    ```

## Tools and Libraries

- **Express.js**: For creating the API routes.
- **dotenv**: For managing environment variables.
- **nodemon**: To auto-reload the server during development (use `npm run dev` for this).
- **Postman/curl**: To test the API endpoints.
