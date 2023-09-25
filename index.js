const express = require("express");
const redis = require("redis");
const redisClient = redis.createClient({
  host: 'rediss'
});
const app = express();

redisClient.set('count', 0);

app.get("/", async (req, res) => {
  redisClient.get("count", (err, count) => {
    redisClient.set("count", parseInt(count) + 1);
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      <style>
        /* Custom CSS for visitor count container */
        .visitor-count-container {
          background-color: #3498db;
          color: #fff;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="visitor-count-container">
              <h1 class="title is-4 has-text-white">Visitor Count</h1>
              <p class="subtitle is-2">${parseInt(count) + 1}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>  
    `);
  });
});

app.listen(9000, async () => {
  console.log("Listening on 9000.");
});
