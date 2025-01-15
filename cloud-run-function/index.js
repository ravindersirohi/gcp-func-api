
import { http } from '@google-cloud/functions-framework';
const { GoogleAuth } = require('google-auth-library');

http('helloGithub', async (req, res) => {
  
  // Calling securec cloud function.
  const url = 'https://secure-func-817570901624.europe-west2.run.app';
  const targetAudiance = url;
  const auth = new GoogleAuth();

  try{
    const client = await auth.getIdTokenClient(targetAudiance);
    const secureFuncResponse = await client.request({url});
    res.send({message: secureFuncResponse.data})
  }
  catch(err){
    res.send({message: err.message})
  }
});