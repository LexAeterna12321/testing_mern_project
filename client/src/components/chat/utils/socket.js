import io from "socket.io-client";
const socketURL = "http://localhost:5000";
const socket = io.connect(socketURL);

export const initSocket = () => {
  socket.on("connect", () => {
    console.log("connected with socket.io");
  });
};

export const handleOnSockets = (type, elem, toggleTyping) => {
  socket.on(type, function(data) {
    if (type === "chat") {
      elem.current.innerHTML += `<p>${data.userName}: ${data.message} </p>`;
    } else if (type === "typing") {
      const restUsers = data.filter(user => user.userName !== user.name);
      if (restUsers.some(user => user.typing)) {
        console.log(restUsers);
        const typingUsers = restUsers.map(user => user.userName);
        console.log({ typingUsers });
        toggleTyping(true);
        elem.current.innerHTML =
          typingUsers.length > 1
            ? `<p>${typingUsers.join(", ")} are typing...</p>`
            : `<p>${typingUsers.join("")} is typing...</p>`;
      } else {
        elem.current.innerHTML = "";
        toggleTyping(false);
      }
    }
  });
};

export const handleEmitSockets = (type, data) => {
  socket.emit(type, JSON.stringify(data));
};
