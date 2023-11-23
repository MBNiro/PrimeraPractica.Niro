const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "Chat",
    text: "nombre de usuario:",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "El Nombre de usuario es obligatorio";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.username}: ${msg.message}<strong></p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socket.on("newUser", (username) => {
  Toastify({
    text: `${username} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
  }).showToast();
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p> ${data} is writting... </p>`;
});