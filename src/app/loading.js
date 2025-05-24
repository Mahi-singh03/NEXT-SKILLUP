export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Animated Code Typing Indicator */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-3 h-6 bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-6 bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-6 bg-yellow-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="text-gray-700 ml-4 font-mono text-sm">Compiling lessons...</div>
        </div>
  
        {/* Progress Bar */}
        <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
        </div>
  
        {/* Computer Education Themed Message */}
        <div className="text-center max-w-md">
          <h3 className="font-mono text-lg font-semibold text-gray-800 mb-2">Loading Coding Environment</h3>
          <p className="text-gray-600 text-sm">
            Preparing interactive coding exercises, lecture videos, and learning materials...
          </p>
        </div>
  
        {/* Keyboard Animation */}
        <div className="mt-12 flex space-x-1">
          {['⌨', '💻', '📚', '🧑‍💻'].map((emoji, index) => (
            <span 
              key={index}
              className="text-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
  
        {/* Tips (randomly displayed) */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-sm text-center">
          <p className="text-xs text-blue-800 font-mono">
            <span className="font-bold">Pro Tip:</span> While waiting, stretch your hands. Proper ergonomics is key for coders!
          </p>
        </div>
      </div>
    );
  }