
import { http } from '@google-cloud/functions-framework';

http('helloFromGit', (req, res) => {
  res.send(`Hello ${req.query.name || req.body.name || 'from Git!'}!`);
});