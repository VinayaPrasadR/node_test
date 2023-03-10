const {google} = require('googleapis');
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')
const secret=require('./secrets')
const app = express();

let client_id;
let client_secret;
let oAuth2Client;



secret.clientId().then((data1)=>{
  client_id = `${data1}`;
  secret.clientSecret().then((data2)=>{
    client_secret = `${data2}`;
    oAuth2Client = new OAuth2Client(
      client_id,
      client_secret,
      'https://indus-373613.el.r.appspot.com/callback'
    );
  });
});


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
    let array2=tokens.tokens.scope.split(' ')

    if(array2.length === scopes.length && array2.every(elem => scopes.includes(elem)))
         return res.send(tokens)
     else 
         return getAuthenticatedClient().then((authorizeUrl)=>res.redirect(authorizeUrl))
          
    
});


const PORT=process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`App listening http://localhost:${PORT}`);
  });










  