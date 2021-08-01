import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from '@material-ui/icons'
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import MoreVert from '@material-ui/icons/MoreVert'
import React, { useState, useEffect } from 'react'
import './Chat.css'
import db from './firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'
const Chat = () => {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")

    const [messages, setMessages] = useState([])
    const { roomId } = useParams()

    const [{ user }, dispatch] = useStateValue()
    // console.log(roomId)
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                })
        }
    }, [roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        // console.log(data)
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        alert("send message")
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate())
                        .toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">

                {messages.map((message) => (
                    <>
                    
                    <div className={`chat_message ${user.displayName === message.name && "chat_receiver"}`}>
                    <div className="chat_name ">
                            {message.name}
                    </div>    
                        <p>{message.message}
                            <span className="chat_timestamp">
                                {new Date(message.timestamp?.toDate())
                                    .toUTCString()}
                            </span>
                        </p>
                    </div>
                    </>
                ))}


            </div>
            <div className="chat_footer">
                <InsertEmotionIcon />
                <form>
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
                    <button
                        onClick={(e) => sendMessage(e)}
                        type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
