# Full-Stack URL Shortener Application

This repository contains a full-stack URL shortener application built as part of a technical evaluation. The project is comprised of a backend microservice developed with Node.js and Express, and a responsive frontend web application developed with React and Material UI.

---

## Features

-   **URL Shortening:** Converts long URLs into concise, shareable links.
-   **Custom Shortcodes:** Allows users to specify an optional custom shortcode for their link.
-   **Link Expiration:** All generated links are configured with a default validity period of 30 minutes.
-   **Redirection:** Short links correctly redirect to their original destination URL.
-   **Usage Statistics:** Provides a dedicated statistics page to view analytics for each link, including the total number of clicks.
-   **Centralized Logging:** Both the frontend and backend applications are integrated with a remote logging service for monitoring and observability.

---

## Technology Stack

-   **Backend:** Node.js, Express.js, TypeScript
-   **Frontend:** React, TypeScript, Material UI
-   **API Client:** Axios
-   **Development Tools:** ts-node-dev, Create React App

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (version 16 or later)
-   npm (version 8 or later)

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/matheshvishnu/1CR22CS225.git](https://github.com/matheshvishnu/1CR22CS225.git)
    cd 1CR22CS225
    ```

2.  **Set up the Backend:**
    ```bash
    cd Backend
    npm install
    ```
    -   **Important:** Open `/Backend/src/utils/logger.ts` and replace the placeholder with your valid authentication token.

3.  **Set up the Frontend:**
    ```bash
    cd ../Frontend
    npm install
    ```
    -   **Important:** Open `/Frontend/src/utils/logger.ts` and replace the placeholder with your valid authentication token.

### Running the Application

Two separate terminal sessions are required to run the application.

1.  **Start the Backend Server:**
    -   In a terminal, navigate to the `/Backend` directory.
    -   Run the command:
        ```bash
        npm start
        ```
    -   The server will be available at `http://localhost:3001`.

2.  **Start the Frontend Application:**
    -   In a second terminal, navigate to the `/Frontend` directory.
    -   Run the command:
        ```bash
        npm start
        ```
    -   The application will open in your browser at `http://localhost:3000`.

---

## Project Structure

The project is organized into three primary directories:

-   `/Logging Middleware`: A self-contained, reusable TypeScript function for sending logs.
-   `/Backend`: The Node.js/

