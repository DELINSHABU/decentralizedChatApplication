
 const gun = Gun({
      peers: ['https://relay.dam.us'], // Use a public relay peer
      localStorage: true // Enable local storage for data persistence
    });

    const chatRoom = gun.get('chat');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesDiv = document.getElementById('messages');

    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message) {
        chatRoom.set({ sender: 'User', text: message, timestamp: Date.now() });
        messageInput.value = '';
      }
    });

    chatRoom.map().on(messageData => {
      if (messageData) {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${messageData.sender}: ${messageData.text}`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message
      }
    });
