<template>
  <f7-page>
    <f7-navbar title="Messsages" back-link="Back"></f7-navbar>

    <f7-messagebar
      :placeholder="placeholder"
      ref="messagebar"
      :attachments-visible="attachmentsVisible"
      :sheet-visible="sheetVisible"
      :value="messageText"
      @input="messageText = $event.target.value"
    >
      <f7-link
        icon-ios="f7:camera_fill"
        icon-aurora="f7:camera_fill"
        icon-md="material:camera_alt"
        slot="inner-start"
        @click="sheetVisible = !sheetVisible"
      ></f7-link>
      <f7-link
        icon-ios="f7:arrow_up_round_fill"
        icon-aurora="f7:arrow_up_round_fill"
        icon-md="material:send"
        slot="inner-end"
        @click="sendMessage"
      ></f7-link>
      <f7-messagebar-attachments>
        <f7-messagebar-attachment
          v-for="(image, index) in attachments"
          :key="index"
          :image="image"
          @attachment:delete="deleteAttachment(image)"
        ></f7-messagebar-attachment>
      </f7-messagebar-attachments>
      <f7-messagebar-sheet>
        <f7-messagebar-sheet-image
          v-for="(image, index) in images"
          :key="index"
          :image="image"
          :checked="attachments.indexOf(image) >= 0"
          @change="handleAttachment"
        ></f7-messagebar-sheet-image>
      </f7-messagebar-sheet>
    </f7-messagebar>

    <f7-messages ref="messages">
      <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title>
      <f7-message
        v-for="(message, index) in messagesData"
        :key="index"
        :type="message.type"
        :image="message.image"
        :name="message.name"
        :avatar="message.avatar"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
      >
        <span slot="text" v-if="message.text" v-html="message.text"></span>
      </f7-message>
      <f7-message v-if="typingMessage"
        type="received"
        :typing="true"
        :first="true"
        :last="true"
        :tail="true"
        :header="`${typingMessage.name} is typing`"
        :avatar="typingMessage.avatar"
      ></f7-message>
    </f7-messages>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Messages, f7MessagesTitle, f7Message, f7Messagebar, f7Link, f7MessagebarAttachments, f7MessagebarAttachment, f7MessagebarSheet, f7MessagebarSheetImage } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Messages,
      f7MessagesTitle,
      f7Message,
      f7Messagebar,
      f7MessagebarAttachments,
      f7MessagebarAttachment,
      f7MessagebarSheet,
      f7MessagebarSheetImage,
      f7Link,
    },
    data() {
      return {
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
        self.messagebar = self.$refs.messagebar.f7Messagebar;
        self.messages = self.$refs.messages.f7Messages;
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
        const text = self.messageText.replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        self.attachments.forEach((attachment) => {
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

        // Reset attachments
        self.attachments = [];
        // Hide sheet
        self.sheetVisible = false;
        // Clear area
        self.messageText = '';
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
