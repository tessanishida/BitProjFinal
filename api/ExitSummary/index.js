
const accountSid = "AC85330b72efc3e7ac43bee9603a4580fd";
const authToken = "40e6c7a10ce33f4c30e1b3bced35539d";
const client = require('twilio')(accountSid, authToken);

module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let response = await client.messages
      .create({
         body: 'Text message from the timer!',
         from: '+17327163516',
         to: '+18082202539'
       })
      .then(message => console.log(message.sid));

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
      };
}