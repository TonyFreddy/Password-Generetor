import React from 'react'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
      <div className='bg-gray-900 text-gray-200 w-full max-w-md border rounded-2xl shadow-xl border-gray-800 p-8'>

        <h1 className='text-2xl font-bold text-center mb-5'>
          Password Generator
        </h1>

        {/* Password Display */}
        <div className='flex mb-4'>
          <input type="text" placeholder='Generated Password' className='flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' readOnly />
          <button className='bg-indigo-600 hover:bg-indigo-700 px-4 rounded-r-lg transition'>
            Copy
          </button>
        </div>

        {/* Password Length */}
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium'>Password Length</label>
          <input type="range" min="6" max="32" className="w-full accent-indigo-600" />
        </div>

        {/* Options */}
        <div className='space-y-3 mb-6'>
          <label className='flex items-center justify-between cursor-pointer'>
            <span>Include UpperCase</span>
            <input type="checkbox" className='accent-indigo-600 w-4 h-4' />
          </label>
          <label className='flex items-center justify-between cursor-pointer'>
            <span>Include LowerCase</span>
            <input type="checkbox" className='accent-indigo-600 w-4 h-4' />
          </label>
          <label className='flex items-center justify-between cursor-pointer'>
            <span>Include Numbers</span>
            <input type="checkbox" className='accent-indigo-600 w-4 h-4' />
          </label>
          <label className='flex items-center justify-between cursor-pointer'>
            <span>Include Symbols</span>
            <input type="checkbox" className='accent-indigo-600 w-4 h-4' />
          </label>
        </div>

       
        {/* Generate button */}
        <button className='w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition'>
          Generate Password
        </button>


      </div>
    </div>
  )
}

export default App