#!/bin/sh

# Create a dynamic config.js file with REACT_APP_API_URL
cat <<EOF > /usr/share/nginx/html/config.js
window.REACT_APP_API_URL = "${REACT_APP_API_URL}";
EOF

# Start Nginx
nginx -g "daemon off;"
