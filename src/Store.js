import React from "react";
import io from "socket.io-client";
export const CTX = React.createContext();

const initState = {
  general: [
    { from: "aaron", msg: "hi there" },
    { from: "Gary", msg: "hi there" },
    { from: "Maryy", msg: "hi there" }
  ],
  topic2: [
    { from: "aaron", msg: "hi there" },
    { from: "aaron", msg: "hi there" },
    { from: "aaron", msg: "hi there" }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}
let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  if (!socket) {
    socket = io(":3001");
  }

  const [allChats] = React.useReducer(reducer, initState);
  return (
    <CTX.Provider value={{ allChats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
}
