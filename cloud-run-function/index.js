
import { http } from '@google-cloud/functions-framework';

http('helloGithub', (req, res) => {
  res.send(`Hello ${req.query.name || req.body.name || 'from Github!'}!`);
});