import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const WhoIsTyping = ({ presenceData }) => {

    let names = '';
    if (presenceData.length > 0) {
        names = presenceData
            .map((p) => { return p.data })
            .filter(p => { return p !== "" && p !== undefined })
            .join(', ')
    }
    if (names === '') {
        names = `Nobody. It's lonely in here...`;
    }

    return <p>
        Who's typing? {names}
    </p>
}

const Channel = () => {
    let params = useParams();
    configureAbly({ authUrl: `/.netlify/functions/auth` });

    // Load history of messages on first load of a new channel
    useEffect(() => {
        channel.history((err, result) => {
            updateMessages(result.items)
        });

        // because we want to detect changes to channelId but don't use it...
        // eslint-disable-next-line
    }, [params.channelId])

    // Handle subscription of new messages
    const [messages, updateMessages] = useState([]);
    const [channel] = useChannel(params.channelId, (message) => {
        updateMessages((prev) => [...prev, message]);
    });

    // Handle publishing of messages
    const [composeText, setComposeText] = useState('');
    const { user } = useAuth0();
    const send = (event) => {
        event.preventDefault();
        channel.publish("message", { text: composeText, sender: user.email });
        setComposeText('');
    }

    // Handle typing indicator
    const [presenceData, updateStatus] = usePresence(params.channelId);
    const [isTyping, setIsTyping] = useState(false);
    let timer = null;
    const typing = () => {
        clearTimeout(timer);

        if (!isTyping) {
            setIsTyping(true)
            updateStatus(user.email);

            timer = setTimeout(() => {
                setIsTyping(false);
                updateStatus("");
            }, 1000);
        }
    }

    return (
        <>
            <h1>Welcome to #{params.channelId}</h1>
            <WhoIsTyping presenceData={presenceData} />
            <div className="messages">
                {messages && messages.map((msg, index) =>
                    <div className="message" key={msg.id}>
                        <div className="text">{msg.data.text}</div>
                        <div className="sender">{msg.data.sender}</div>
                    </div>
                )}
            </div>
            <div className="composer">
                <form onSubmit={send}>
                    <input
                        type="text"
                        value={composeText}
                        onChange={(e) => setComposeText(e.target.value)}
                        onKeyUp={(e) => typing()}
                    />
                    <button>Send</button>
                </form>
            </div>
        </>
    );
};

export default withAuthenticationRequired(Channel);