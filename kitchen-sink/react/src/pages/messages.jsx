import React, { useEffect, useRef, useState } from 'react';
import {
  Navbar,
  Page,
  Messages,
  MessagesTitle,
  Message,
  Messagebar,
  Link,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  MessagebarSheetImage,
  f7ready,
  f7,
} from 'framework7-react';

export default () => {
  const images = [
    'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
    'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
  ];
  const people = [
    {
      name: 'Kate Johnson',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
    },
    {
      name: 'Blue Ninja',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
    },
  ];
  const answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Lorem ipsum dolor sit amet, consectetur',
    'What?',
    'Are you sure?',
    'Of course',
    'Need to think about it',
    'Amazing!!!',
  ];
  const [attachments, setAttachments] = useState([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messagesData, setMessagesData] = useState([
    {
      type: 'sent',
      text: 'Hi, Kate',
    },
    {
      type: 'sent',
      text: 'How are you?',
    },
    {
      name: 'Kate',
      type: 'received',
      text: 'Hi, I am good!',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
    },
    {
      name: 'Blue Ninja',
      type: 'received',
      text: 'Hi there, I am also fine, thanks! And how are you?',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
    },
    {
      type: 'sent',
      text: 'Hey, Blue Ninja! Glad to see you ;)',
    },
    {
      type: 'sent',
      text: 'Hey, look, cutest kitten ever!',
    },
    {
      type: 'sent',
      image: 'https://cdn.framework7.io/placeholder/cats-200x260-4.jpg',
    },
    {
      name: 'Kate',
      type: 'received',
      text: 'Nice!',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
    },
    {
      name: 'Kate',
      type: 'received',
      text: 'Like it very much!',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
    },
    {
      name: 'Blue Ninja',
      type: 'received',
      text: 'Awesome!',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
    },
  ]);

  const responseInProgress = useRef(false);
  const messagebar = useRef(null);

  const attachmentsVisible = () => {
    return attachments.length > 0;
  };
  const placeholder = () => {
    return attachments.length > 0 ? 'Add comment or Send' : 'Message';
  };
  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get('.messagebar');
    });
  });
  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };
  const deleteAttachment = (image) => {
    const index = attachments.indexOf(image);
    attachments.splice(index, 1);
    setAttachments([...attachments]);
  };
  const handleAttachment = (e) => {
    const index = f7.$(e.target).parents('label.checkbox').index();
    const image = images[index];
    if (e.target.checked) {
      // Add to attachments
      attachments.unshift(image);
    } else {
      // Remove from attachments
      attachments.splice(attachments.indexOf(image), 1);
    }
    setAttachments([...attachments]);
  };
  const sendMessage = () => {
    const text = messageText.replace(/\n/g, '<br>').trim();
    const messagesToSend = [];
    attachments.forEach((attachment) => {
      messagesToSend.push({
        image: attachment,
      });
    });
    if (text.length) {
      messagesToSend.push({
        text,
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }
    setAttachments([]);
    setSheetVisible(false);
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText('');

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

    setTimeout(() => {
      const answer = answers[Math.floor(Math.random() * answers.length)];
      const person = people[Math.floor(Math.random() * people.length)];
      setTypingMessage({
        name: person.name,
        avatar: person.avatar,
      });
      setTimeout(() => {
        setTypingMessage(null);
        setMessagesData([
          ...messagesData,
          ...messagesToSend,
          {
            text: answer,
            type: 'received',
            name: person.name,
            avatar: person.avatar,
          },
        ]);
        responseInProgress.current = false;
      }, 4000);
    }, 1000);
  };

  return (
    <Page>
      <Navbar title="Messages" backLink="Back"></Navbar>

      <Messagebar
        placeholder={placeholder()}
        attachmentsVisible={attachmentsVisible()}
        sheetVisible={sheetVisible}
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
      >
        <Link
          iconIos="f7:camera_fill"
          iconMd="material:camera_alt"
          slot="inner-start"
          onClick={() => {
            setSheetVisible(!sheetVisible);
          }}
        />
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={sendMessage}
        />
        <MessagebarAttachments>
          {attachments.map((image, index) => (
            <MessagebarAttachment
              key={index}
              image={image}
              onAttachmentDelete={() => deleteAttachment(image)}
            />
          ))}
        </MessagebarAttachments>
        <MessagebarSheet>
          {images.map((image, index) => (
            <MessagebarSheetImage
              key={index}
              image={image}
              checked={attachments.indexOf(image) >= 0}
              onChange={handleAttachment}
            />
          ))}
        </MessagebarSheet>
      </Messagebar>

      <Messages>
        <MessagesTitle>
          <b>Sunday, Feb 9,</b> 12:58
        </MessagesTitle>

        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            image={message.image}
            name={message.name}
            avatar={message.avatar}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            {message.text && (
              <span slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
            )}
          </Message>
        ))}
        {typingMessage && (
          <Message
            type="received"
            typing={true}
            first={true}
            last={true}
            tail={true}
            header={`${typingMessage.name} is typing`}
            avatar={typingMessage.avatar}
          />
        )}
      </Messages>
    </Page>
  );
};
