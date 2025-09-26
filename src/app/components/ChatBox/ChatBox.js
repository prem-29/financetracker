import React, { useState } from "react";
import "./styles.css";
import axios from 'axios'

function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! Ask me about your expenses or income." }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: "user", text: input }]);
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem("token");
        try {
            // Replace with your API endpoint
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/aiAgent/ask`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                params: {
                    user_id: userDetail.id,
                    question: input, // send question as query param
                },
            });
            if (response.status === 200) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        { sender: "bot", text: response.data.answer },
                    ]);
                }, 1000);
            } else {
                alert("Try again");
            }
        } catch (error) {
            alert('An error occurred while get income data. Please try again.', error);
        }
        setInput("");
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">Finance Chatbot</div>

            <div className="chat-body">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    placeholder="Type your message..."
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
