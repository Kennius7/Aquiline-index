# Use the official Nginx image as base
FROM nginx:alpine

# Copy the website files to the Nginx web directory
COPY . /usr/share/nginx/html

# Copy custom Nginx configuration if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
