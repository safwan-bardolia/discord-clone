import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../features/appSlice'
import { selectUser } from '../features/userSlice'
import db from '../firebase'
import "./Chat.css"
import ChatHeader from './ChatHeader'
import Message from './Message'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'

function Chat() {

    const user = useSelector(selectUser);
    const channelID = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    // for message input
    const [input, setInput] = useState('');

    //
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        // if channelId is present otherwise error
        if(channelID) {
            db.collection('channels')   // go to channels collection
            .doc(channelID)             // inside 'channel' collection go to current channelId Document
            .collection('messages')     // inside that doc go to collection 'messages'
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map((doc)=>{
                    return {id: doc.id, message:doc.data()}
                }))
            })
        }
    },[channelID])

    const sendMessage = (e) => {
        e.preventDefault();
        
        // if input is present then only save, without this 'if', if we press enter on input then empty msg is also send
        if(input) {
            db.collection('channels')
            .doc(channelID)
            .collection('messages')
            .add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user,         // to get particular user photo & display name on corresponding message
            })
        }

        // clear the input
        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                <FlipMove>
                    {messages.map(msg=>(
                        <Message 
                            key={msg.id}
                            timestamp={msg.message.timestamp}
                            message={msg.message.message}
                            user={msg.message.user}
                        />
                    ))}
                </FlipMove>
            </div>

            <div className="chat__input">
                <AddCircle fontSize="large"/>
                <form>
                    {/* by default input type is text */}
                    <input 
                        // if channel is not selected then disable input functionality
                        disabled={!channelID}
                        placeholder={`Message #${channelName? channelName:'please select channel'}`}
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                    />
                    <button onClick={sendMessage} className="chat__inputButton" type="submit">Send message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcard fontSize="large"/>
                    <Gif fontSize="large"/>
                    <EmojiEmotions fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
