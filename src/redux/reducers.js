// TOP-LEVEL REDUCERS

export function isLoggedIn(state = false, action) {
  switch (action.type) {
    case "RECEIVE_CURRENT_USER":
      return true;
    default:
      return state;
  }
}

export function currentUser(state = { loading: true }, action) {
  switch (action.type) {
    case "NO_TOKEN":
      return { loading: false };
    case "REQUEST_CURRENT_USER":
      return { loading: true };
    case "RECEIVE_CURRENT_USER":
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        id: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loading: false
      };
    default:
      return state;
  }
}

export function activeConversationId(state = null, action) {
  switch (action.type) {
    case "RECEIVE_CONVERSATIONS":
      // eslint-disable-next-line
      const sortedConvos = action.payload.conversations.sort((a, b) => {
        if (a.latest_message && b.latest_message) {
          return (
            new Date(b.latest_message.created_at) -
            new Date(a.latest_message.created_at)
          );
        } else if (!a.latest_message) {
          return -1;
        } else if (!b.latest_message) {
          return 1;
        }
      });
      if (sortedConvos.length) {
        return sortedConvos[0].id;
      } else {
        return state;
      }
    case "RECEIVE_ADDED_CONVERSATION":
      if (!action.payload.latest_message) {
        return action.payload.id;
      }
      return state;
    case "CHANGE_ACTIVE_CONVERSATION":
      return action.payload.id;
    case "LEAVE_CONVERSATION":
      if (state === action.payload.conversation_id) {
        return null;
      }
      return state;
    default:
      return state;
  }
}

export function conversations(state = [], action) {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return [...state, { id: action.payload.id, title: action.payload.title, messages: action.payload.messages }];
    case "EDIT_CONVERSATION_TITLE":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, title: action.payload.title, latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });
    case "RECEIVE_ADDED_MESSAGE":
      return editConversation(state, action, (oldConvo, action) => {
        if (oldConvo.messages.length) {
          return { ...oldConvo, latest_message: action.payload, messages: messages(oldConvo.messages, action) };
        }
        return { ...oldConvo, latest_message: action.payload };
      });
    case "PUSH_INITIAL_MESSAGE": 
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });  
    case "RECEIVE_ADDED_USERS":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, users: oldConvo.users.concat(action.payload.users) };
      });
    case "RECEIVE_CONVERSATIONS":
      return action.payload.conversations.map(conversation => ({
        ...conversation,
        messages: [],
        loading: false,
        new: false
      }));
    case "REQUEST_MESSAGES":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, loading: true, new: false };
      });
    case "RECEIVE_MESSAGES":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, loading: false, messages: messages(oldConvo.messages, action)};
      });
    case "RECEIVE_VIEW_CONVERSATION":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, last_viewed: action.payload.last_viewed, new: false };
      });
    case "RECEIVE_ADDED_CONVERSATION":
      let myMessages = [];
      if (action.payload.messages) {
        myMessages = action.payload.messages;
      }
      const newConversation = { ...action.payload, messages: myMessages, loading: false };
      return [...state, newConversation];
    case "LEAVE_CONVERSATION":
      return [...state].filter(conv => conv.id !== action.payload.conversation_id);
    case "RECEIVE_LEFT_CONVERSATION":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, users: oldConvo.users.filter(u => u.id !== action.payload.user_id), latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });
    default:
      return state;
  }
}

export function conversationsLoading(state = false, action) {
  switch (action.type) {
    case "REQUEST_CONVERSATIONS":
      return true;
    case "RECEIVE_CONVERSATIONS":
      return false;
    default:
      return state;
  }
}

export function showNewConversationModal(state = false, action) {
  switch (action.type) {
    case "SHOW_NEW_CONVERSATION_MODAL":
      return true;
    case "HIDE_NEW_CONVERSATION_MODAL":
      return false;
    default:
      return state;
  }
}

export function showUserProfileModal(state = false, action) {
  switch (action.type) {
    case "SHOW_USER_PROFILE_MODAL":
      return true;
    case "HIDE_USER_PROFILE_MODAL":
      return false;
    default:
      return state;
  }
}

export function showEditConversationModal(
  state = { isShown: false, conversationId: null },
  action
) {
  switch (action.type) {
    case "SHOW_EDIT_CONVERSATION_MODAL":
      return { isShown: true, conversationId: action.payload };
    case "HIDE_EDIT_CONVERSATION_MODAL":
      return { isShown: false, conversationId: null };
    default:
      return state;
  }
}

// SUB-LEVEL REDUCERS

function messages(state = [], action) {
  switch (action.type) {
    case "RECEIVE_ADDED_MESSAGE":
      return [...state, action.payload];
    case "RECEIVE_MESSAGES":
      return [...state, ...action.payload.messages];
    case "PUSH_INITIAL_MESSAGE":
    case "EDIT_CONVERSATION_TITLE":
    case "RECEIVE_LEFT_CONVERSATION":
      return [...state, action.payload.message];
    default:
      return state;
  }
}

// HELPER FUNCTIONS

function editConversation(state, action, callback) {
  const oldConvoIndex = state.findIndex(
    c => c.id === action.payload.conversation_id
  );
  const oldConvo = state[oldConvoIndex];
  const newConvo = callback(oldConvo, action);
  const newConvos = [...state];
  newConvos.splice(oldConvoIndex, 1, newConvo);
  return newConvos;
}
