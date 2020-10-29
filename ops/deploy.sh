cd ../dev/frontend
npm run build
cd ..
rm -rf ./backend/build
mv ./frontend/build ./backend

docker build ../dev/backend/. -t felixchen1998/nitrous:latest
docker push felixchen1998/nitrous:latest
