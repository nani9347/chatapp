const ws = new WebSocket(`ws://${location.host}`);
const chatWindow = document.getElementById("chatWindow");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");

function appendMessage(user, text) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.textContent = `${user}: ${text}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "init") {
    data.messages.forEach((msg) => appendMessage(msg.user, msg.text));
  } else if (data.type === "new") {
    const msg = data.message;
    appendMessage(msg.user, msg.text);
  }
};

function sendMessage() {
  const user = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!user || !text) return;

  const msg = { user, text };
  ws.send(JSON.stringify(msg));
  messageInput.value = "";
}
