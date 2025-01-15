
import { http } from '@google-cloud/functions-framework';

http('helloGithub', async (req, res) => {
  
  // Calling securec cloud function.
  const url = 'https://secure-func-817570901624.europe-west2.run.app';
  const targetAudiance = url;
  const auth = new GoogleAuth();

  try{
    const client = await auth.getIdTokenClient(targetAudiance);
    const funcDemoResp = await client.request({url});
    res.send({message: funcDemoResp.data})
  }
  catch(err){
    res.send({message: err.message})
  }
});