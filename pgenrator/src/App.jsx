import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*`~_-,'./|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed]);

  useEffect(() => { passwordGenerator();}, [passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-white bg-gray-800'>
        <h1 className='text-center text-xl mb-4'>Password Generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={Password}
            className='outline-none w-full py-2 px-4 text-black'
            placeholder='Password'
            readOnly
          />
          <button 
            onClick={copyToClipboard} 
            className='bg-orange-500 text-white px-4 py-2'
          >
            Copy
          </button>
        </div>
        <div className='mb-4'>
          <label className='inline-flex items-center'>
            <input 
              type='checkbox' 
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className='form-checkbox'
            />
            <span className='ml-2'>Include Numbers</span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='inline-flex items-center'>
            <input 
              type='checkbox' 
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className='form-checkbox'
            />
            <span className='ml-2'>Include Special Characters</span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Password Length: {length}</label>
          <input 
            type="range" 
            min="4" 
            max="20" 
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='w-full'
          />
        </div>
        <button 
          onClick={passwordGenerator} 
          className='w-full py-2 bg-orange-500 rounded text-white'
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
