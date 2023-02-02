const Ably = require("ably/promises");
const rest = new Ably.Rest(process.env.ABLY_ROOT_KEY);

exports.handler = async function (event, context) {
  const tokenParams = { clientId: 'client-' + Math.floor(Math.random() * 999999) + 1 };
  const tokenRequest = await rest.auth.createTokenRequest(tokenParams);

  return {
    statusCode: 200,
    body: JSON.stringify(tokenRequest)
  }

};
