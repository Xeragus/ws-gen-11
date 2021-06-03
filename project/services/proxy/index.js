const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

require('dotenv').config()

app.use('/api/v1/auth', proxy(
  `http://localhost:${process.env.AUTH_API_PORT}`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${process.env.AUTH_API_PORT}/api/v1/auth${req.url}`
    }
  }
));

app.use('/blogposts', proxy(
  `http://localhost:${process.env.BLOG_API_PORT}`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${process.env.BLOG_API_PORT}/blogposts${req.url}`
    }
  }
));

const PORT = process.env.PORT || process.env.PROXY_SERVICE_PORT;
app.listen(PORT, err => {
  if(err) {
      return console.log('Could not start proxy service', err);
  }
  console.log(`Proxy service successfully started on port ${PORT}`);
});

//                          users (3000)       \
//                        /                     \
//                       /
// browser -> proxy (X) -- auth (3001)          -   DB
//                       \
//                        \                      /
//                          storage (3002)      /
