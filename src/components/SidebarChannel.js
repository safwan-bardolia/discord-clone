import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../features/appSlice';
import "./SidebarChannel.css"

function SidebarChannel({id, channelName}) {

    const dispatch = useDispatch();

    const handleSetChannelInfo = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName
        }))
    }

    return (
        <div className="sidebarChannel" onClick={handleSetChannelInfo}>
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
