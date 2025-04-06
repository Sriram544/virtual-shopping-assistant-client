import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export default function App() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);

    const handleAsk = async () => {
        const res = await fetch(\`\${API_BASE}/process-user-input\`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput: input }),
        });
        const data = await res.json();
        setChat([...chat, { user: input, bot: data.productSuggestions }]);
        setInput("");
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Virtual Shopping Assistant</h1>
            <div style={{ marginBottom: 10 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me something..."
                    style={{ width: "80%", padding: 10 }}
                />
                <button onClick={handleAsk} style={{ padding: 10, marginLeft: 10 }}>
                    Ask
                </button>
            </div>
            <div>
                {chat.map((item, idx) => (
                    <div key={idx}>
                        <p><strong>You:</strong> {item.user}</p>
                        <p><strong>AI:</strong> {item.bot.map(p => \`\${p.productName} - $\${p.price}\`).join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
