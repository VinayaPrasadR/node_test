const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const clientIdSecret='projects/608515195512/secrets/clientId/versions/1'
const clientSecretSecret='projects/608515195512/secrets/clientSecret/versions/1'



module.exports={


clientId:()=>{

   return new Promise(async(resolve,reject)=>{

     const [clientIdRetrieved] = await client.accessSecretVersion({
      name: clientIdSecret,
    });
     const clientId=clientIdRetrieved.payload.data.toString('utf8');
      resolve(clientId)
   })
      
},

clientSecret:()=>{

  return new Promise(async(resolve,reject)=>{

    const [clientSecretRetrieved] = await client.accessSecretVersion({
      name: clientSecretSecret,
    });
    const clientSecret=clientSecretRetrieved.payload.data.toString('utf8');
    resolve(clientSecret)
  })
     
}

}











/*
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


  */