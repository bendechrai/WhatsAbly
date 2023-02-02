// const ably = new Ably.Realtime(process.env.ABLY_ROOT_KEY);
const ably = new Ably.Realtime.Promise(process.env.ABLY_ROOT_KEY);
// const channel = ably.channels.get('channel1');

exports.handler = async function (event, context) {
    await ably.connection.once('connected');
    console.log('Connected to Ably!');
        
    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};


