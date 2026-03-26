import { useEffect, useState } from 'react'

const App = () => {

  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "^$£%µ!#{}[]<>()_?@&*";

  // Password strength
  const getStrength = () => {
    let score = 0;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 16) score++;
    if (length >= 24) score++;
    if (score <= 2) return { label: "Weak", color: "bg-red-500", text: "text-red-400", width: "w-1/3" };
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500", text: "text-yellow-400", width: "w-2/3" };
    return { label: "Strong", color: "bg-green-500", text: "text-green-400", width: "w-full" };
  };

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += upperChars;
    if (includeLower) chars += lowerChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    if (!chars) {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(generated);
    setCopied(false);

    // Save to history (max 10)
    setHistory((prev) => {
      const updated = [generated, ...prev.filter((p) => p !== generated)];
      return updated.slice(0, 10);
    });
  };

  const handleCopy = (pwd = password) => {
    if (!pwd) return;
    navigator.clipboard.writeText(pwd);
    setCopied(pwd);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => setHistory([]);

  useEffect(() => {
    generatePassword();
  }, [length, includeLower, includeNumbers, includeUpper, includeSymbols]);

  const strength = getStrength();

  const options = [
    { label: "Include UpperCase", value: includeUpper, setter: setIncludeUpper },
    { label: "Include LowerCase", value: includeLower, setter: setIncludeLower },
    { label: "Include Numbers",   value: includeNumbers, setter: setIncludeNumbers },
    { label: "Include Symbols",   value: includeSymbols, setter: setIncludeSymbols },
  ];

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>

        {/* Card */}
        <div className='bg-gray-900 text-gray-200 w-full border rounded-2xl shadow-xl border-gray-800 p-8'>

          {/* Title */}
          <h1 className='text-2xl font-bold text-center mb-1'>
            🔐 Password Generator
          </h1>
          <p className='text-sm text-gray-500 text-center mb-6'>
            Generate a secure password instantly
          </p>

          {/* Password Display */}
          <div className='flex mb-3'>
            <input
              type="text"
              value={password}
              placeholder='Generated Password'
              className='flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono'
              readOnly
            />
            <button
              onClick={() => handleCopy(password)}
              className={`px-4 rounded-r-lg transition font-medium text-sm ${copied === password ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}>
              {copied === password ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Strength indicator */}
          <div className='mb-5'>
            <div className='flex justify-between text-xs text-gray-400 mb-1'>
              <span>Strength</span>
              <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
            </div>
            <div className='w-full bg-gray-700 rounded-full h-2'>
              <div className={`h-2 rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}></div>
            </div>
          </div>

          {/* Password Length */}
          <div className='mb-5'>
            <div className='flex justify-between mb-2'>
              <label className='text-sm font-medium'>Password Length</label>
              <span className='text-indigo-400 font-bold'>{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <span>6</span>
              <span>32</span>
            </div>
          </div>

          {/* Options */}
          <div className='space-y-3 mb-6'>
            {options.map(({ label, value, setter }) => (
              <label key={label} className='flex items-center justify-between cursor-pointer group'>
                <span className='text-sm group-hover:text-indigo-400 transition'>{label}</span>
                <div
                  onClick={() => setter(!value)}
                  className={`w-10 h-5 rounded-full transition-colors duration-300 flex items-center px-1 cursor-pointer ${value ? "bg-indigo-600" : "bg-gray-700"}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`}></div>
                </div>
              </label>
            ))}
          </div>

          {/* Generate button */}
          <button
            onClick={generatePassword}
            className='w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 py-2 rounded-lg font-semibold transition-all cursor-pointer mb-3'>
            🔄 Generate Password
          </button>

          {/* History toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className='w-full text-sm text-gray-500 hover:text-gray-300 transition text-center cursor-pointer'>
            {showHistory ? "▲ Hide History" : "▼ Show History"}
          </button>

        </div>

        {/* History */}
        {showHistory && (
          <div className='bg-gray-900 border border-gray-800 rounded-2xl mt-3 p-5 text-gray-200'>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='text-sm font-semibold text-gray-400'>Recent Passwords</h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className='text-xs text-red-400 hover:text-red-300 transition cursor-pointer'>
                  Clear all
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className='text-xs text-gray-600 text-center py-3'>No history yet</p>
            ) : (
              <ul className='space-y-2'>
                {history.map((pwd, index) => (
                  <li key={index} className='flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2'>
                    <span className='text-xs font-mono text-gray-300 truncate flex-1 mr-3'>{pwd}</span>
                    <button
                      onClick={() => handleCopy(pwd)}
                      className={`text-xs px-2 py-1 rounded transition whitespace-nowrap cursor-pointer ${copied === pwd ? "bg-green-600 text-white" : "bg-gray-700 hover:bg-indigo-600 text-gray-300"}`}>
                      {copied === pwd ? "Copied!" : "Copy"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default App