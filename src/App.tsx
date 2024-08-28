import { useEffect, useState } from 'react'
import './App.css'
import { connectToServer, sendMessage } from './socket-client.ts'
export interface Message {
  id: string;
  message: string;
}
function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState('');
  useEffect(() => {
    console.log('HOLa');
    connectToServer(
      handleMessages,
      setMyId,
    );
  }, [])

  const handleMessages = (payload: { id: string, message: string }) => {
    setMessages(prevMessages => [...prevMessages, payload]);
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const formEvent = {
        preventDefault: () => { },
      } as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  return (
    <>
      <div className="bg-gray-400 max-w-7xl mx-auto py-20 space-y-10">
        {messages.map((m, index) => (
          <div key={index} className={`${m.id === myId ? 'flex justify-end' : 'flex justify-start'}`}>
            <div className="bg-green-500  m-1  border border-slate-300 p-5 rounded-lg">{m.message}</div>

          </div>
        ))}
      </div>
      <div className="bg-gray-800 max-w-7xl mx-auto p-5">
        <form onSubmit={handleSubmit} className="flex max-w-7xl mx-auto">
          <textarea
            placeholder="Write your message"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-gray-800 border border-slate-300 p-5 rounded-lg text-white resize-none"
            rows={1}
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Send Message</button>
        </form>
      </div >
    </>
  )
}

export default App
