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
      return sortedConvos[0].id;
    case "RECEIVE_ADDED_CONVERSATION":
    case "CHANGE_ACTIVE_CONVERSATION":
      return action.payload.id;
    default:
      return state;
  }
}

export function conversations(state = [], action) {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          messages: action.payload.messages
        }
      ];
    case "EDIT_CONVERSATION_TITLE":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, title: action.payload.text };
      });
    case "RECEIVE_ADDED_MESSAGE":
      return editConversation(state, action, (oldConvo, action) => {
        return {
          ...oldConvo,
          latest_message: action.payload,
          messages: messages(oldConvo.messages, action)
        };
      });
    case "RECEIVE_CONVERSATIONS":
      return action.payload.conversations.map(conversation => ({
        ...conversation,
        messages: [],
        loading: false
      }));
    case "REQUEST_MESSAGES":
      return editConversation(state, action, (oldConvo, action) => {
        return {
          ...oldConvo,
          loading: true
        };
      });
    case "RECEIVE_MESSAGES":
      return editConversation(state, action, (oldConvo, action) => {
        return {
          ...oldConvo,
          loading: false,
          messages: messages(oldConvo.messages, action)
        };
      });
    case "RECEIVE_VIEW_CONVERSATION":
      return editConversation(state, action, (oldConvo, action) => {
        return {
          ...oldConvo,
          last_viewed: action.payload.last_viewed
        };
      });
    case "RECEIVE_ADDED_CONVERSATION":
      const newConversation = {
        ...action.payload,
        messages: []
      };
      return [...state, newConversation];
    case "RECEIVE_LEFT_CONVERSATION":
      return [...state].filter(
        conv => conv.id !== action.payload.conversation_id
      );
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
