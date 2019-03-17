import React from 'react';
import { Navbar, Page, Messages, MessagesTitle, Message, Messagebar, Link, MessagebarAttachments, MessagebarAttachment, MessagebarSheet, MessagebarSheetImage } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachments: [],
      sheetVisible: false,
      typingMessage: null,
      messageText: '',
      messagesData: [
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
      ],
      images: [
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
      ],
      people: [
        {
          name: 'Kate Johnson',
          avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        },
        {
          name: 'Blue Ninja',
          avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        },
      ],
      answers: [
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
      ],
      responseInProgress: false,
    }
  }
  render() {
    return (
      <Page>
        <Navbar title="Messsages" backLink="Back"></Navbar>

        <Messagebar
          placeholder={this.placeholder}
          ref={(el) => {this.messagebarComponent = el}}
          attachmentsVisible={this.attachmentsVisible}
          sheetVisible={this.state.sheetVisible}
          value={this.state.messageText}
          onInput={(e) => this.setState({messageText: e.target.value})}
        >
          <Link
            iconIos="f7:camera_fill"
            iconAurora="f7:camera_fill"
            iconMd="material:camera_alt"
            slot="inner-start"
            onClick={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
          ></Link>
          <Link
            iconIos="f7:arrow_up_round_fill"
            iconAurora="f7:arrow_up_round_fill"
            iconMd="material:send"
            slot="inner-end"
            onClick={this.sendMessage.bind(this)}
          ></Link>
          <MessagebarAttachments>
            {this.state.attachments.map((image, index) => (
              <MessagebarAttachment
                key={index}
                image={image}
                onAttachmentDelete={() => this.deleteAttachment(image)}
              ></MessagebarAttachment>
            ))}
          </MessagebarAttachments>
          <MessagebarSheet>
            {this.state.images.map((image, index) => (
              <MessagebarSheetImage
                key={index}
                image={image}
                checked={this.state.attachments.indexOf(image) >= 0}
                onChange={this.handleAttachment.bind(this)}
              ></MessagebarSheetImage>
            ))}
          </MessagebarSheet>
        </Messagebar>

        <Messages ref={(el) => {this.messagesComponent = el}}>
          <MessagesTitle><b>Sunday, Feb 9,</b> 12:58</MessagesTitle>

          {this.state.messagesData.map((message, index) => (
            <Message
              key={index}
              type={message.type}
              image={message.image}
              name={message.name}
              avatar={message.avatar}
              first={this.isFirstMessage(message, index)}
              last={this.isLastMessage(message, index)}
              tail={this.isTailMessage(message, index)}
            >
              {message.text && (
                <span slot="text" dangerouslySetInnerHTML={{__html: message.text}} />
              )}
            </Message>
          ))}
          {this.state.typingMessage && (
            <Message
              type="received"
              typing={true}
              first={true}
              last={true}
              tail={true}
              header={`${this.state.typingMessage.name} is typing`}
              avatar={this.state.typingMessage.avatar}
            ></Message>
          )}
        </Messages>
      </Page>
    )
  }

  get attachmentsVisible() {
    const self = this;
    return self.state.attachments.length > 0;
  }
  get placeholder() {
    const self = this;
    return self.state.attachments.length > 0 ? 'Add comment or Send' : 'Message';
  }
  componentDidMount() {
    const self = this;
    self.$f7ready(() => {
      self.messagebar = self.messagebarComponent.f7Messagebar;
      self.messages = self.messagesComponent.f7Messages;
    });
  }
  isFirstMessage(message, index) {
    const self = this;
    const previousMessage = self.state.messagesData[index - 1];
    if (message.isTitle) return false;
    if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
    return false;
  }
  isLastMessage(message, index) {
    const self = this;
    const nextMessage = self.state.messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
    return false;
  }
  isTailMessage(message, index) {
    const self = this;
    const nextMessage = self.state.messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
    return false;
  }
  deleteAttachment(image) {
    const self = this;
    const attachments = self.state.attachments;
    const index = attachments.indexOf(image);
    attachments.splice(index, 1);
    self.setState({ attachments });
  }
  handleAttachment(e) {
    const self = this;
    const attachments = self.state.attachments;
    const index = self.$$(e.target).parents('label.checkbox').index();
    const image = self.state.images[index];
    if (e.target.checked) {
      // Add to attachments
      attachments.unshift(image);
    } else {
      // Remove from attachments
      attachments.splice(attachments.indexOf(image), 1);
    }
    self.setState({ attachments });
  }
  sendMessage() {
    const self = this;
    const text = self.state.messageText.replace(/\n/g, '<br>').trim();
    const messagesToSend = [];
    self.state.attachments.forEach((attachment) => {
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

    self.setState({
      // Reset attachments
      attachments: [],
      // Hide sheet
      sheetVisible: false,
      // Send message
      messagesData: [...self.state.messagesData, ...messagesToSend],
      // Clear
      messageText: '',
    });

    // Focus area
    if (text.length) self.messagebar.focus();

    // Mock response
    if (self.state.responseInProgress) return;
    self.setState({
      responseInProgress: true,
    })
    setTimeout(() => {
      const answer = self.state.answers[Math.floor(Math.random() * self.state.answers.length)];
      const person = self.state.people[Math.floor(Math.random() * self.state.people.length)];
      self.setState({
        typingMessage: {
          name: person.name,
          avatar: person.avatar,
        },
      });
      setTimeout(() => {
        self.setState({
          messagesData: [...self.state.messagesData, {
            text: answer,
            type: 'received',
            name: person.name,
            avatar: person.avatar,
          }],
          typingMessage: null,
          responseInProgress: false,
        });
      }, 4000);
    }, 1000);
  }
};
