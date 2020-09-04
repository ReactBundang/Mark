import React, {useEffect,useState} from 'react';

export const PlayerInfo = props =>
{
    return (
        <div>
            Player{props.idx+1}
             : {props.name} 
            ({props.howfar}KM Far)
            ----- {props.score}
        </div>
    )
}
export default PlayerInfo;