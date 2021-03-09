
const accountSid = "AC85330b72efc3e7ac43bee9603a4580fd";
const authToken = "905c8ac3b226add611817b6a475b88e6";
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