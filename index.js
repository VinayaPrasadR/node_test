const {google} = require('googleapis');
const express = require('express');


const app = express();
const PORT=process.env.PORT || 8000

const oauth2Client = new google.auth.OAuth2(
    "794602203764-l4p5vpnlqrt9pmsdhocbbqfvjlgrbfmc.apps.googleusercontent.com",
    "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",
    'https://indus-373613.el.r.appspot.com/callback'
  );

function getGoogleAuthURL() {

    const scopes = [
        'https://www.googleapis.com/auth/gmail.readonly'
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes
    });
  }



 app.get("/authorize", (req, res) => {
    res.redirect(getGoogleAuthURL());
  });
  

app.get("/callback",async(req,res)=>{

   
    if(req.query.error) return res.redirect(getGoogleAuthURL());

    const code = req.query.code
    console.log(code)
    const tokens  = await oauth2Client.getToken(code)
    res.send(tokens)
});




  app.listen(PORT, () => {
    console.log(`App listening http://localhost:${PORT}`);
  });