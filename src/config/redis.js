const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: "VoivKbthOpQQj90hKunp4SLjSPjnnyGI",
  socket: {
    host: "redis-18080.crce263.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 18080,
  },
});
module.exports = redisClient;
