#!/bin/sh

# Dynamically generate the public/config.js file
cat <<EOF > /usr/share/nginx/html/config.js
window.REACT_APP_API_URL = "${REACT_APP_API_URL}";
EOF

# Start the Nginx server
nginx -g "daemon off;"
