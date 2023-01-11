const {google} = require('googleapis');
const express = require('express');
const {OAuth2Client} = require('google-auth-library');


const app = express();
const PORT=process.env.PORT || 8000

  const oAuth2Client = new OAuth2Client(
    "794602203764-l4p5vpnlqrt9pmsdhocbbqfvjlgrbfmc.apps.googleusercontent.com",
   "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",
   'http://127.0.0.1:8000/callback'
);

  function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {

      const scopes = [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/userinfo.profile'

    ];

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
    res.status(200).send("Thankyou for the permission....You can return back to the app");
});




  app.listen(PORT, () => {
    console.log(`App listening http://localhost:${PORT}`);
  });