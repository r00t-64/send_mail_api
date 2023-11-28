# API Documentation

## Base URL
- Base URL: `https://perfect-buckle-lion.cyclic.app`

## Endpoints

### `POST /send-email`

#### Description
This endpoint is used to send an email with the specified parameters.

#### Request
- **Method:** POST
- **Headers:**
  - `Content-Type`: application/json
- **Body:**
  - `to` (string, required): Email address of the recipient.
  - `subject` (string, required): Subject of the email.
  - `text` (string, required): Body of the email.
  - `name` (string): Name of the sender (optional).
  - `email` (string): Email address of the sender (optional).
  - `phone` (string): Phone number of the sender (optional).
  - `message` (string): Additional message from the sender (optional).

#### Response
- **Success Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success": "Email sent successfully",
      "info": "<details about the sent email>"
    }
    ```
- **Error Response:**
  - **Status Code:** 400 Bad Request or 500 Internal Server Error
  - **Body:**
    ```json
    {
      "error": "Failed to send email",
      "details": "<error message>"
    }
    ```

## Environment Variables

Create a `.env` file in the root of your project and define the following variables:

- `GMAIL_TOKEN`: Token for Gmail authentication.
- `GMAIL_USER`: Gmail user email address.
- `URL_ORIGIN`: Origin URL for your product.
- `PORT`: Port on which the server will run.

### Example `.env` file
```env
GMAIL_TOKEN=your_gmail_token
GMAIL_USER=your_gmail_user@example.com
URL_ORIGIN=http://your-product-url.com
PORT=3000
```

# Running the Server
To start the server, run the following command in your terminal:

```bash
node server.js
```

