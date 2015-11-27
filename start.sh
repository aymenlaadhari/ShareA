echo Starting application...
echo Port: ${VCAP_APP_PORT}
echo Host: ${VCAP_APP_HOST}
npm install http-server
node_modules/.bin/http-server -a ${VCAP_APP_HOST} -p ${VCAP_APP_PORT} .
