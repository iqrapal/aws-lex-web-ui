// In the most simple form, you can load the component in a single statement:
//   new ChatBotUiLoader.FullPageLoader().load();

// The script below break the process into parts to further illustrate
// the load process.

// The ChatBotUiLoader variable contains the FullPageLoader field which is a
// constructor for the loader.
var Loader = ChatBotUiLoader.FullPageLoader;

// The loader constructor supports various configurable options used to
// control how the component configuration and dependencies are retrieved.
// In this case, we are just passing one option (which doesn't changethe
// default) for illustration purposes.
var loaderOpts = {
  // The following option controls if the local config should be ignored
  // when running this page embedded in an iframe.
  // If set to true, only passes the parentOrigin field when run as an
  // iframe and delegates the config to the parent
  shouldIgnoreConfigWhenEmbedded: true,

  // Controls if it should load minimized production dependecies
  // defaults to true for production builds and false in development
  shouldLoadMinDeps: true,
};

// Instantiate the loader by optionally passing the loader options to
// control its behavior. You may leave the options empty if you wish
// to take the defaults which works in most cases.
var loader = new Loader(loaderOpts);

// When loading the chatbot UI component, you can optionally pass it a
// configuration object
var chatbotUiConfig = {
  lex: {
    sessionAttributes: {
      /* QNAClientFilter: '', */
      userAgent: navigator.userAgent
    }
  }
};

// Calling the load function of the loader does a few things:
//   1. Loads JavaScript and CSS dependencies to the DOM
//   2. Loads the chatbot UI configuration from various sources
//       (e.g. JSON file, event)
//   3. Instantiates the chatbot UI component in the DOM
loader
  .load(chatbotUiConfig)
  .then(function () { console.log('ChatBotUiLoader loaded'); })
  .catch(function (error) { console.error(error); });

// Override the title after the chatbot loads
document.title = "QUT Chatbot";

// Function to toggle the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('menu-overlay');
  const isOpen = sidebar.classList.contains('open');

  if (isOpen) {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  } else {
    sidebar.classList.add('open');
    overlay.style.display = 'block';
  }
}

// Function to load conversation history into the sidebar
function loadConversationHistory() {
  const conversationHistory = [
    { id: 1, name: 'Conversation 1', messages: [{ sender: 'user', text: 'What is EDR?' }, { sender: 'bot', text: 'EDR stands for Endpoint Detection and Response, a cybersecurity technology.' }] },
    { id: 2, name: 'Conversation 2', messages: [{ sender: 'user', text: 'How can you help me?' }, { sender: 'bot', text: 'I can assist you with information on a variety of topics.' }] }
  ];

  const conversationList = document.getElementById('conversation-list');
  conversationList.innerHTML = ''; // Clear previous list items

  conversationHistory.forEach(convo => {
    const li = document.createElement('li');
    li.textContent = convo.name;
    li.onclick = () => loadConversation(convo);
    conversationList.appendChild(li);
  });
}

// Function to load selected conversation into the chat window
function loadConversation(conversation) {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.innerHTML = ''; // Clear current chat
  conversation.messages.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.sender}: ${msg.text}`;
    chatWindow.appendChild(div);
  });
  toggleSidebar(); // Close sidebar after selecting a conversation
}

// Initialize the conversation history on page load
window.onload = function() {
  loadConversationHistory();  // Populate the sidebar with history
};

// Send message (you can modify to interact with your bot)
function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value;
  if (message) {
    displayUserMessage(message);  // Display the user message
    input.value = '';  // Clear the input
    // Add logic to send the message to Lex bot here
  }
}

// Display the user message in the chat window
function displayUserMessage(message) {
  const chatWindow = document.getElementById('chat-window');
  const userMessageElement = document.createElement('div');
  userMessageElement.style.color = '#000';
  userMessageElement.innerText = `user: ${message}`;
  chatWindow.appendChild(userMessageElement);
}

// Display the bot message in the chat window
function displayBotMessage(message) {
  const chatWindow = document.getElementById('chat-window');
  const botMessageElement = document.createElement('div');
  botMessageElement.style.color = '#0058A3';
  botMessageElement.innerText = `bot: ${message}`;
  chatWindow.appendChild(botMessageElement);
}
