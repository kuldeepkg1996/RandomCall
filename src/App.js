import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Row, Col } from 'react-bootstrap';
import VideoChat from './components/VideoChat';
import Chat from './components/Chat';

const socket = io('http://localhost:3001');

function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Video Chat App</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <VideoChat socket={socket} />
        </Col>
        <Col xs={12} md={6}>
          <Chat socket={socket} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
