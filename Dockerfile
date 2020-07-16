FROM nginx:1.19.1-alpine
COPY dist/BooksUser /usr/share/nginx/html
