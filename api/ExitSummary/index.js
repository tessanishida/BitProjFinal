
// need accountSid and authToken
const client = require('twilio')(accountSid, authToken);

module.exports = async function (context, req) {

    if (req.body && req.body.phoneNumber) {
      let response = await client.messages
      .create({
         body: req.body.messageContent,
         from: '+17327163516',
         to: req.body.phoneNumber
       })
      .then(message => console.log(message.sid));

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
      };
    }
    else {
      context.res = {
          status: 400,
          body: "Please pass a name on the query string or in the request body"
      };
    }
}