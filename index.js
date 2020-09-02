const express = require('express');
const allowCors = require('allow-cors');
const app = express();
const http = require('http');
const port = 3000

const router = express.Router();

app.use(allowCors({
    origin: '*',
    headers: '*',
    methods: '*',
    credentials: '*',
}))

router.all('*', async (req, res) => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: req.url,
        method: req.method, 
        headers: req.headers,
    }

    const request = http.request(options, (response) => {
        response.pipe(res);
    });
    
    request.on('error', (e) => {
        console.error(e);
    });
    
    req.pipe(request)
})  

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})