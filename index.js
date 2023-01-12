const {google} = require('googleapis');
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')

const app = express();
const PORT=process.env.PORT || 8000

const oAuth2Client = new OAuth2Client(
    "794602203764-l4p5vpnlqrt9pmsdhocbbqfvjlgrbfmc.apps.googleusercontent.com",
   "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",
   'http://127.0.0.1:8000/callback'
);

const scopes = [

  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.readonly',
  'openid'
    
];

function getAuthenticatedClient() {

    return new Promise((resolve, reject) => {
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
      });
        
         resolve(authorizeUrl)
    })}

 app.get("/authorize", (req, res) => {

    getAuthenticatedClient().then((authorizeUrl)=>res.redirect(authorizeUrl))
  });
  

app.get("/callback",async(req,res)=>{

   
    if(req.query.error) 
     return getAuthenticatedClient().then((authorizeUrl)=>res.redirect(authorizeUrl))

    const code = req.query.code
    const tokens = await oAuth2Client.getToken(code);
    //axios({method:'GET',url:`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokens.tokens.access_token}`}).then((response)=>{
        
        //let array = response.data.scope.split(' ');
        //console.log(tokens.tokens.scope)
        /*if(JSON.stringify(array2) === JSON.stringify(scopes))
        {
            return res.send(tokens)
        }})*/
        let array2=tokens.tokens.scope.split(' ')
        if(array2.length === scopes.length && array2.every(elem => scopes.includes(elem)))
           return res.send(tokens)
        else 
           return getAuthenticatedClient().then((authorizeUrl)=>res.redirect(authorizeUrl))
          
    
});




  app.listen(PORT, () => {
    console.log(`App listening http://localhost:${PORT}`);
  });