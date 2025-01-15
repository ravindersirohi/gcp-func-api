
import { http } from '@google-cloud/functions-framework';
import { GoogleAuth } from 'google-auth-library';

http('helloGithub', async (req, res) => {
  try {
    // Set SECURE_FUNC_URL = https://secure-func-xxx.erope-west2.run.app in environment variable.
    const url = process.env.SECURE_FUNC_URL;
    const targetAudiance = url;
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetAudiance);
    // Calling secure cloud function 
    const secureFuncResponse = await client.request({url});
    res.send({message: secureFuncResponse.data});
  }
  catch(err) {
    res.send({message: err.message})
  }
});