<script>
  import { onMount } from 'svelte';
  import {
    f7,
    f7ready,
    Navbar,
    Page,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Icon,
    MessagebarAttachments,
    MessagebarAttachment,
    MessagebarSheet,
    MessagebarSheetImage,
  } from 'framework7-svelte';

  let messagebarInstance;

  let attachments = [];
  let sheetVisible = false;
  let typingMessage = null;
  let messageText = '';
  let messagesData = [
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
  ];
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
  let responseInProgress = false;

  $: attachmentsVisible = attachments.length > 0;
  $: placeholder = attachments.length > 0 ? 'Add comment or Send' : 'Message';

  onMount(() => {
    f7ready(() => {
      messagebarInstance = f7.messagebar.get('.messagebar');
    });
  });

  function isFirstMessage(message, index) {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  }
  function isLastMessage(message, index) {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  }
  function isTailMessage(message, index) {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  }
  function deleteAttachment(image) {
    const index = attachments.indexOf(image);
    attachments.splice(index, 1);
    attachments = attachments;
  }
  function handleAttachment(e) {
    const index = f7.$(e.target).parents('label.checkbox').index();
    const image = images[index];
    if (e.target.checked) {
      // Add to attachments
      attachments.unshift(image);
    } else {
      // Remove from attachments
      attachments.splice(attachments.indexOf(image), 1);
    }
    attachments = attachments;
  }
  function sendMessage() {
    const text = messageText.replace(/\n/g, '<br>').trim();
    const messagesToSend = [];
    attachments.forEach((attachment) => {
      messagesToSend.push({
        type: 'sent',
        image: attachment,
      });
    });
    if (text.length) {
      messagesToSend.push({
        text,
        type: 'sent',
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }

    // Reset attachments
    attachments = [];
    // Hide sheet
    sheetVisible = false;
    // Send message
    messagesData = [...messagesData, ...messagesToSend];
    // Clear
    messageText = '';
    messagebarInstance.clear();

    // Focus area
    if (text.length) messagebarInstance.focus();

    // Mock response
    if (responseInProgress) return;
    responseInProgress = true;

    setTimeout(() => {
      const answer = answers[Math.floor(Math.random() * answers.length)];
      const person = people[Math.floor(Math.random() * people.length)];
      typingMessage = {
        name: person.name,
        avatar: person.avatar,
      };
      setTimeout(() => {
        messagesData = [
          ...messagesData,
          {
            text: answer,
            type: 'received',
            name: person.name,
            avatar: person.avatar,
          },
        ];
        typingMessage = null;
        responseInProgress = false;
      }, 4000);
    }, 1000);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Messages" backLink="Back" />

  <Messagebar
    {placeholder}
    {attachmentsVisible}
    {sheetVisible}
    value={messageText}
    onInput={(e) => (messageText = e.target.value)}
  >
    <a class="link icon-only" slot="inner-start" on:click={() => (sheetVisible = !sheetVisible)}>
      <Icon ios="f7:camera_fill" md="material:camera_alt" />
    </a>
    <a class="link icon-only" slot="inner-end" on:click={sendMessage}>
      <Icon ios="f7:arrow_up_circle_fill" md="material:send" />
    </a>
    <MessagebarAttachments>
      {#each attachments as image, index (index)}
        <MessagebarAttachment
          key={index}
          {image}
          onAttachmentDelete={() => deleteAttachment(image)}
        />
      {/each}
    </MessagebarAttachments>
    <MessagebarSheet>
      {#each images as image, index (index)}
        <MessagebarSheetImage
          key={index}
          {image}
          checked={attachments.indexOf(image) >= 0}
          onChange={handleAttachment}
        />
      {/each}
    </MessagebarSheet>
  </Messagebar>

  <Messages>
    <MessagesTitle><b>Sunday, Feb 9,</b> 12:58</MessagesTitle>
    {#each messagesData as message, index (index)}
      <Message
        type={message.type}
        image={message.image}
        name={message.name}
        avatar={message.avatar}
        first={isFirstMessage(message, index)}
        last={isLastMessage(message, index)}
        tail={isTailMessage(message, index)}
        htmlText={message.text}
      />
    {/each}
    {#if typingMessage}
      <Message
        type="received"
        typing={true}
        first={true}
        last={true}
        tail={true}
        header={`${typingMessage.name} is typing`}
        avatar={typingMessage.avatar}
      />
    {/if}
  </Messages>
</Page>
