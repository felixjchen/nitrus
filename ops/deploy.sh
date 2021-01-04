cd ../src/frontend
npm run build
cd ..
rm -rf ./backend/build
mv ./frontend/build ./backend

docker build ../src/backend/. -t felixchen1998/nitrous:latest
docker push felixchen1998/nitrous:latest
