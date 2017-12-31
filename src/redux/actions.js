const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token
};

export const addConversation = (id, title) => {
  return {
    type: "ADD_CONVERSATION",
    payload: {
      id,
      title,
      loading: false,
      messages: []
    }
  };
};

export const editConversationTitle = (conversationId, text) => {
  return {
    type: "EDIT_CONVERSATION_TITLE",
    payload: {
      conversationId,
      text
    }
  };
};

export const changeActiveConversation = id => {
  return {
    type: "CHANGE_ACTIVE_CONVERSATION",
    payload: {
      id
    }
  };
};

export const showNewConversationModal = () => {
  return {
    type: "SHOW_NEW_CONVERSATION_MODAL"
  };
};

export const hideNewConversationModal = () => {
  return {
    type: "HIDE_NEW_CONVERSATION_MODAL"
  };
};

export const showUserProfileModal = () => {
  return {
    type: "SHOW_USER_PROFILE_MODAL"
  };
};

export const hideUserProfileModal = () => {
  return {
    type: "HIDE_USER_PROFILE_MODAL"
  };
};

// API Thunks

const requestConversations = () => ({
  type: "REQUEST_CONVERSATIONS"
});

const receiveConversations = conversations => {
  return {
    type: "RECEIVE_CONVERSATIONS",
    payload: {
      conversations
    }
  };
};

export const fetchConversations = userId => {
  return dispatch => {
    dispatch(requestConversations());
    return fetch(`${API_ROOT}/user/${userId}/conversations`, { headers })
      .then(res => res.json())
      .then(conversations => {
        dispatch(receiveConversations(conversations));
      });
  };
};

/* --------------------------------------- */

const requestMessages = conversation_id => ({
  type: "REQUEST_MESSAGES",
  payload: {
    conversation_id
  }
});

const receiveMessages = messages => {
  return {
    type: "RECEIVE_MESSAGES",
    payload: {
      conversation_id: messages[0].conversation_id,
      messages
    }
  };
};

export const fetchMessagesForActiveConversation = activeConversationId => {
  return dispatch => {
    dispatch(requestMessages(activeConversationId));
    return fetch(`${API_ROOT}/conversation/${activeConversationId}/messages`, {
      headers
    })
      .then(res => res.json())
      .then(messages => {
        dispatch(receiveMessages(messages));
      });
  };
};

/* --------------------------------------- */

const sendAddedMessage = conversation_id => ({
  type: "SEND_ADDED_MESSAGE",
  payload: {
    conversation_id
  }
});

const receiveAddedMessage = message => ({
  type: "RECEIVE_ADDED_MESSAGE",
  payload: message
});

export const addMessage = (text, conversation_id, user_id) => {
  return dispatch => {
    dispatch(sendAddedMessage(conversation_id));
    return fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({ conversation_id, user_id, text })
    })
      .then(res => res.json())
      .then(message => dispatch(receiveAddedMessage(message)));
  };
};

/* --------------------------------------- */

const requestCurrentUser = () => {
  return {
    type: "REQUEST_CURRENT_USER"
  };
};

const receiveCurrentUser = json => {
  return {
    type: "RECEIVE_CURRENT_USER",
    payload: {
      id: json.id,
      username: json.username,
      firstName: json.first_name,
      lastName: json.last_name,
      token: json.token
    }
  };
};

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(requestCurrentUser());
    return fetch(`${API_ROOT}/current_user`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receiveCurrentUser(json)));
  };
};

/* --------------------------------------- */

const receiveViewConversation = json => ({
  type: "RECEIVE_VIEW_CONVERSATION",
  payload: json
})

export const updateViewConversation = (user_id, conversation_id) => {
  return dispatch => {
    return fetch(`${API_ROOT}/conversation/view`, {
      method: "POST",
      headers,
      body: JSON.stringify({ user_id, conversation_id })
    })
      .then(res => res.json())
      .then(message => dispatch(receiveViewConversation(message)));
  }
}

/* --------------------------------------- */

export const login = (username, password) => {
  return dispatch => {
    dispatch(requestCurrentUser());
    return fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(json => dispatch(receiveCurrentUser(json)))
      .then(() => (window.location.href = "/"));
  };
};

export const noToken = () => {
  return {
    type: "NO_TOKEN"
  };
};
