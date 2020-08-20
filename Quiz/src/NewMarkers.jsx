import React, { Component, useState, useEffect }  from 'react';
import {Marker} from 'google-maps-react';

export const NewMarkers=(props)=>{
    return(
        <Marker position={props.location}
                      icon={{url:"https://mitchin.s3.ap-northeast-2.amazonaws.com/backup/react/icons/marker1.png"}}/>
        // <Marker position={fields2.location}
        //         icon={{url:"https://mitchin.s3.ap-northeast-2.amazonaws.com/backup/react/icons/marker2.png"}}/>
    );
}