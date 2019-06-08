import io from "socket.io-client";
const socketURL = "http://localhost:5000";
export const socket = io.connect(socketURL);

export const initSocket = async () => {
  await socket.on("connect", () => {
    console.log("connected with socket.io");
  });
};

export const handleOnSockets = (type, elem, currentUser, toggleTyping) => {
  socket.on(type, async function(data) {
    switch (type) {
      case "chat":
        return (elem.current.innerHTML += `<p>${data.userName}: ${
          data.message
        } </p>`);
      case "typing":
        const restUsers = await data.filter(
          user => user.userName !== currentUser
        );
        if (restUsers.some(user => user.typing)) {
          const typingUsers = restUsers.map(user => user.userName);
          toggleTyping(true);
          return (elem.current.innerHTML =
            typingUsers.length > 1
              ? `<p>${typingUsers.join(", ")} are typing...</p>`
              : `<p>${typingUsers.join("")} is typing...</p>`);
        } else {
          toggleTyping(false);
          elem.current.innerHTML = "";
          return "";
        }

      default:
        toggleTyping(false);
        elem.current.innerHTML = "";
        return "";
    }
  });
};

export const handleEmitSockets = (type, data) => {
  socket.emit(type, JSON.stringify(data));
};
