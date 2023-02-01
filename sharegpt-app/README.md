# ChatGPT Share

Frontend for ChatGPT Share. To start sharing ChatGPT conversations, visit https://github.com/domeccleston/chatgpt-extension and install the Chrome extension.

## Running Locally

1. Have Node.js and MySQL installed
2. Run the command below to migrate the database. Note, you must create a MySQL database first and replace the values in the command with your own.

```bash
    export DATABASE_URL="mysql://user:password@host:port/database"
    npx prisma migrate dev --schema sharegpt-app/prisma/schema.prisma
```

3. Copy the .env.example file to .env and fill in the values
4. Install dependencies in the sharegpt-app

```bash
cd sharegpt-app
yarn
```

5. Start the server

```bash
    yarn dev
```






