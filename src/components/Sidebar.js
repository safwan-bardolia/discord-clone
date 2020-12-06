import { Avatar } from '@material-ui/core'
import { Add, Call, ExpandMore, Headset, InfoOutlined, Mic, Settings, SignalCellularAlt } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db, { auth } from '../firebase'
import "./Sidebar.css"
import SidebarChannel from './SidebarChannel'

function Sidebar() {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);       // we fetch this data from db

    useEffect(()=>{
        // onSnapshot : means anything update, delete or changes in collection it gives you updated DB this code re-run
        db.collection("channels")
        .onSnapshot((snapshot)=>{
            // once we get snapshot update the state
            // snapshot.docs gives you array of docs, so map through each doc & return the new array to the setChannels
            setChannels(snapshot.docs.map(doc=>{
                return {id: doc.id, channel: doc.data()}
            }))
        })
    },[])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        // if user enter channel name, to protect against undefined
        if(channelName) {
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }
    console.log(channels)
    return (
        <div className="sidebar">

            <div className="sidebar__top">
                <h3>Clever Programmer</h3>
                <ExpandMore/>
            </div>
           
            <div className="sidebar__channels">
            
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMore/>
                        <h4>Text Channels</h4>
                    </div>
                    <Add onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div>

                <div className="sidebar__channelsList">
                    {console.log(channels)}

                    {channels.map(channel=>(
                        <SidebarChannel key={channel.id} id={channel.id} channelName={channel.channel.channelName}/>
                    ))}
                </div>

            </div>

            <div className="sidebar__voice">
                <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large"/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlined/>
                    <Call/>
                </div>
            </div>

            <div className="sidebar__profile">
                {/* add logout functionality */}
                <Avatar onClick={()=>auth.signOut()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3> 
                    {/* take 1st 5 number from id */}
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <Mic/>
                    <Headset/>
                    <Settings/>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
