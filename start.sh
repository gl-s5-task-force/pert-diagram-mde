#!/bin/bash

# Navigate to the server folder and start the server
echo "Starting server..."
cd server || { echo "Server folder not found"; exit 1; }
npm run start &
SERVER_PID=$!

# Navigate back to the root folder and start the front-end
cd ..
echo "Starting front-end..."
npm run dev &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $SERVER_PID $FRONTEND_PID