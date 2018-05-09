<template>
  <Page>
    <Navbar title="Messsages" backLink="Back"></Navbar>

    <Messagebar
      placeholder={placeholder}
      ref="messagebar"
      attachmentsVisible={attachmentsVisible}
      sheetVisible={sheetVisible}
    >
      <Link
        icon-if-ios="f7:camera_fill"
        icon-if-md="material:camera_alt"
        slot="inner-start"
        @click="sheetVisible = !sheetVisible"
      ></Link>
      <Link
        icon-if-ios="f7:arrow_up_fill"
        icon-if-md="material:send"
        slot="inner-end"
        @click={sendMessage}
      ></Link>
      <MessagebarAttachments>
        <MessagebarAttachment
          v-for="(image, index) in attachments"
          key={index}
          image={image}
          @attachment:delete="deleteAttachment(image)"
        ></MessagebarAttachment>
      </MessagebarAttachments>
      <MessagebarSheet>
        <MessagebarSheetImage
          v-for="(image, index) in images"
          key={index}
          image={image}
          checked={attachments.indexOf(image) >= 0}
          @change={handleAttachment}
        ></MessagebarSheetImage>
      </MessagebarSheet>
    </Messagebar>

    <Messages ref="messages">
      <MessagesTitle><b>Sunday, Feb 9,</b> 12:58</MessagesTitle>
      <Message
        v-for="(message, index) in messagesData"
        key={index}
        type={message.type}
        image={message.image}
        name={message.name}
        avatar={message.avatar}
        first={isFirstMessage(message, index)}
        last={isLastMessage(message, index)}
        tail={isTailMessage(message, index)}
      >
        <span slot="text" v-if="message.text" v-html="message.text"></span>
      </Message>
      <Message v-if="typingMessage"
        type="received"
        typing={true}
        first={true}
        last={true}
        tail={true}
        header={`${typingMessage.name} is typing`}
        avatar={typingMessage.avatar}
      ></Message>
    </Messages>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Messages, MessagesTitle, Message, Messagebar, Link, MessagebarAttachments, MessagebarAttachment, MessagebarSheet, MessagebarSheetImage } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      Messages,
      MessagesTitle,
      Message,
      Messagebar,
      MessagebarAttachments,
      MessagebarAttachment,
      MessagebarSheet,
      MessagebarSheetImage,
      Link,
    },
    data() {
      return {
        attachments: [],
        sheetVisible: false,
        typingMessage: null,
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
            avatar: 'http://lorempixel.com/100/100/people/9',
          },
          {
            name: 'Blue Ninja',
            type: 'received',
            text: 'Hi there, I am also fine, thanks! And how are you?',
            avatar: 'http://lorempixel.com/100/100/people/7',
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
            image: 'http://lorempixel.com/200/260/cats/4/',

          },
          {
            name: 'Kate',
            type: 'received',
            text: 'Nice!',
            avatar: 'http://lorempixel.com/100/100/people/9',
          },
          {
            name: 'Kate',
            type: 'received',
            text: 'Like it very much!',
            avatar: 'http://lorempixel.com/100/100/people/9',
          },
          {
            name: 'Blue Ninja',
            type: 'received',
            text: 'Awesome!',
            avatar: 'http://lorempixel.com/100/100/people/7',
          },
        ],
        images: [
          'http://lorempixel.com/300/300/cats/1/',
          'http://lorempixel.com/200/300/cats/2/',
          'http://lorempixel.com/400/300/cats/3/',
          'http://lorempixel.com/300/150/cats/4/',
          'http://lorempixel.com/150/300/cats/5/',
          'http://lorempixel.com/300/300/cats/6/',
          'http://lorempixel.com/300/300/cats/7/',
          'http://lorempixel.com/200/300/cats/8/',
          'http://lorempixel.com/400/300/cats/9/',
          'http://lorempixel.com/300/150/cats/10/',
        ],
        people: [
          {
            name: 'Kate Johnson',
            avatar: 'http://lorempixel.com/100/100/people/9',
          },
          {
            name: 'Blue Ninja',
            avatar: 'http://lorempixel.com/100/100/people/7',
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
      };
    },
    computed: {
      attachmentsVisible() {
        const self = this;
        return self.attachments.length > 0;
      },
      placeholder() {
        const self = this;
        return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
      },
    },
    mounted() {
      const self = this;
      self.$f7ready(() => {
        self.messagebar = self.$refs.messagebar.Messagebar;
        self.messages = self.$refs.messages.Messages;
      });
    },
    methods: {
      isFirstMessage(message, index) {
        const self = this;
        const previousMessage = self.messagesData[index - 1];
        if (message.isTitle) return false;
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
      },
      isLastMessage(message, index) {
        const self = this;
        const nextMessage = self.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
      isTailMessage(message, index) {
        const self = this;
        const nextMessage = self.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
      deleteAttachment(image) {
        const self = this;
        const index = self.attachments.indexOf(image);
        self.attachments.splice(index, 1)[0]; // eslint-disable-line
      },
      handleAttachment(e) {
        const self = this;
        const index = self.$$(e.target).parents('label.checkbox').index();
        const image = self.images[index];
        if (e.target.checked) {
          // Add to attachments
          self.attachments.unshift(image);
        } else {
          // Remove from attachments
          self.attachments.splice(self.attachments.indexOf(image), 1);
        }
      },
      sendMessage() {
        const self = this;
        const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        self.attachments.forEach((attachment) => {
          messagesToSend.push({
            image: attachment,
          });
        });
        if (text.trim().length) {
          messagesToSend.push({
            text,
          });
        }
        // Reset attachments
        self.attachments = [];
        // Hide sheet
        self.sheetVisible = false;
        // Clear area
        self.messagebar.clear();
        // Focus area
        if (text.length) self.messagebar.focus();
        // Send message
        self.messagesData.push(...messagesToSend);

        // Mock response
        if (self.responseInProgress) return;
        self.responseInProgress = true;
        setTimeout(() => {
          const answer = self.answers[Math.floor(Math.random() * self.answers.length)];
          const person = self.people[Math.floor(Math.random() * self.people.length)];
          self.typingMessage = {
            name: person.name,
            avatar: person.avatar,
          };
          setTimeout(() => {
            self.messagesData.push({
              text: answer,
              type: 'received',
              name: person.name,
              avatar: person.avatar,
            });
            self.typingMessage = null;
            self.responseInProgress = false;
          }, 4000);
        }, 1000);
      },
    },
  };
</script>
