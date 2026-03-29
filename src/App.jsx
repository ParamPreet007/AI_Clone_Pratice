import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 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`,
    'HTTP-Referer': 'http://localhost:3000', // required
    'X-Title': 'ChatGPT Clone' // optional but recommended
  },
  body: JSON.stringify({
    model: 'nvidia/nemotron-3-super-120b-a12b:free', // gpt-3.5 won't work here
    messages: [...messages, userMessage]
  })
});
      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to get response.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ChatGPT Clone</h1>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> {msg.content}
          </div>
        ))}
        {loading && <div>AI is thinking...</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '70%', padding: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: '10px' }}>Send</button>
    </div>
  );
}

export default App;
