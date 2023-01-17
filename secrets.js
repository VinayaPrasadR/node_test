const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const clientIdSecret='projects/608515195512/secrets/clientId'
const clientSecretSecret='projects/608515195512/secrets/clientSecret'


async function getSecrets() {
    const [clientIdRetrieved] = await client.accessSecretVersion({
      name: clientIdSecret,
    });
    const clientId=clientIdRetrieved.payload.data.toString('utf8');
  
    const [clientSecretRetrieved] = await client.accessSecretVersion({
      name: clientSecretSecret,
    });
    const clientSecret=clientSecretRetrieved.payload.data.toString('utf8');
  
    module.exports={
      clientId:clientId,
      clientSecret:clientSecret
    }
  }
  
  getSecrets();


  