// VideoChat.js

import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

const VideoChat = ({ socket }) => {
  const videoRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    const peer = new SimplePeer({ initiator: true, trickle: false });
    peerRef.current = peer; // Store the peer instance in a ref

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
        }

        peer.addStream(stream);

        peer.on('signal', (data) => {
          socket.emit('offer', data);
        });

        socket.on('answer', (data) => {
          peer.signal(data);
        });
      })
      .catch((error) => console.error(error));

    return () => {
      // Clean up when the component is unmounted
      peer.destroy();
    };
  }, [socket]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default VideoChat;
