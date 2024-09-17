// Khai bao module http
const http = require("http");

// Khai bao thong tin cau hinh cho web server
const hostname = "localhost";
const port = 9999;

// Khoi tao 1 web server
const server = http.createServer((req, res) => {
    // Lay headers cua request
    console.log(req.headers)
    // Cau hinh cho response
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>Welcome to NodeJS Server</h1></body></html>");
});

// Kich hoat web server cho phep lang nghe cac request tu clients
server.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
})