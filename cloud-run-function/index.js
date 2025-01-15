
import { http } from '@google-cloud/functions-framework';
import { GoogleAuth } from 'google-auth-library';

http('helloGithub', async (req, res) => {
  try {
    // Calling secure cloud function (for example - https://secure-func-817570901624.europe-west2.run.app).
    const url = process.env.SECURE_FUNC_URL;
    const targetAudiance = url;
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetAudiance);
    const secureFuncResponse = await client.request({url});
    res.send({message: secureFuncResponse.data});
  }
  catch(err) {
    res.send({message: err.message})
  }
});