import { createClient } from "redis";

const client = createClient({
    url: 'redis://localhost:6379'
})

client.on('error', (err) => console.log('Redis Error', err))

if (!client.isOpen) {
  client.connect();
}

export default client;