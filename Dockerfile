FROM denoland/deno:1.21.3
EXPOSE 8000
WORKDIR /
COPY . .
CMD ["deno", "task", "start"] 
