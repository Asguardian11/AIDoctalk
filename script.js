const apiKey = "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"; // Replace with your OpenRouter API key

    function sendMessage(event) {
      event.preventDefault();
      const input = document.getElementById("userInput");
      const message = input.value.trim();
      if (!message) return;

      appendMessage("user", message);
      input.value = "";

      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI Health Consultant in A project called Aidoctalk Develop by M.Galo who only answers questions about Health And Usefull advise. If the question is outside that, politely decline."
            },
            { role: "user", content: message }
          ]
        })
      })
      .then(response => response.json())
      .then(data => {
        const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
        appendMessage("bot", reply);
      })
      .catch(error => {
        console.error("API error:", error);
        appendMessage("bot", "Error: Could not get a response.");
      });
    }

    function appendMessage(sender, text) {
      const chat = document.getElementById("chatMessages");
      const msg = document.createElement("div");
      msg.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
      msg.textContent = text;

      const time = document.createElement("span");
      time.className = "timestamp";
      const now = new Date();
      time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      msg.appendChild(time);
      chat.appendChild(msg);
      chat.scrollTop = chat.scrollHeight;
    }


  function goBack() {
    window.history.back(); // Goes to previous page
  }
