# Adonis.js Project

This is a sample project created with Adonis.js, a powerful Node.js framework. It demonstrates the basic structure and features of an Adonis.js application.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- adonisjs
- lucid (for postgres connection)
- axios (for calling coingecko api)
- PostgreSQL (v10 or higher)

## Installation

1. Clone the repository:

   git clone https://github.com/sakshiu05/fast-way-assignment.git

2. Navigate to the project directory:
  
   cd your-repository

3. Install the dependencies:

   npm install

4. Set up the environment variables:

      Create a copy of the .env.example file and name it .env.

      Update the following environment variables in the .env file:
       
        PORT=3333

        HOST=0.0.0.0

        NODE_ENV=development

        APP_KEY=n_1nkYrtki52OvoDL6K1vPNYNG8Xziwt

        DRIVE_DISK=local

        DB_CONNECTION=pg

        PG_HOST=your-postgres-host

        PG_PORT=your-postgres-port

        PG_USER=your-postgres-username

        PG_PASSWORD=your-postgres-password

        PG_DATABASE=your-postgres-database
  
  5. Run database migrations:

        adonis migration:run

  6. Start the development server:

        node ace serve --watch

  7. Access the API endpoints in your browser or API testing tool:

        GET /coins: Retrieve all coins.

        GET /coins/:id : Retrieve a coin by ID.

        POST /coins: Create a new coin. As mentioned I have added the coin gecko api via axios and stored its data into the db you can fetch this data with get api's. 

Note: Replace your-domain with the actual domain or localhost and your-port with the server port (default is 3333).
        