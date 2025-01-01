#!/bin/bash

# Start the front-end
echo "Starting front-end..."
npm run dev &
FRONTEND_PID=$!

# Navigate to the server folder and start the server
echo "Starting server..."
cd server || { echo "Server folder not found"; exit 1; }
npm run start &
SERVER_PID=$!

# Wait for both processes to finish
wait $FRONTEND_PID $SERVER_PID