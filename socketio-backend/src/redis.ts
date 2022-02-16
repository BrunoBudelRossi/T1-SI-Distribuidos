import { createClient } from 'redis';

export default createClient({
  url: 'redis://localhost:6379'
})