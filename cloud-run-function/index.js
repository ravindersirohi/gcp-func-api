
import { http } from '@google-cloud/functions-framework';
import { GoogleAuth } from 'google-auth-library';

http('helloGithub', async (req, res) => {
  try {
    // Calling securec cloud function.
    const url = 'https://secure-func-817570901624.europe-west2.run.app';
    const targetAudiance = url;
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetAudiance);
    const secureFuncResponse = await client.request({url});
    res.send('{message: secureFuncResponse.data}')
    res.send('Hello from Github func!')
  }
  catch(err) {
    res.send({message: err.message})
  }
});