# WhatsAbly

A WhatsApp clone using Ably

# Steps Taken to Build

## Framework

I started out by creating a new React app and following the guidelines at https://ably.com/tutorials/how-to-ably-react-hooks. I was able to quickly get messages appearing between two different browsers.

Next, I wanted to have two users talking to each other, so I considered either having a form field asking for the user's email address, or to implement Auth0 and take the email address from the user's identity. Further, I considered storing the email adddress in the Client ID of the connection, or as data in each message.

## Identity

I chose to use Auth0, but the preferred option of using an access token to authenticate a call to the API that generates the token request wouldn't work. I realise this is likely because the JWT is expected to have a `kid` defined in its header, which I will revisit some other time.

In the interest of moving on with this demo, I settled on passing the `user.email` from the Auth0 user alongside the message text itself.

## Multi Channel

At this point, I've already created two routes for two chat channels, and the web app sends new messages to the right channel, but switching between them doesn't change the list of messages.

I want to show old messages, so I look into the message history, and applied that whenever the channel changed in the UI.

## Typing Indicator

To implement a typing indicator, I rolled out a simple keypress status with 1 second memory. The indicator only works for the first channel viewed by the user, and unlike `useChannel`, the `usePresence` hook doesn't update when the channelId changes.

I will look into this another time too.

## Next steps

I would want to:

* Use JWT auth for token generation
* Get the indicator working in subsequent channels
* Implment [OpenPGP.js](https://openpgpjs.org/) to create pub/priv keys per user so messages could be end-to-end encrypted