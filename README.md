🤖 Gemini Chat Application
A modern, responsive chat interface for Google's Gemini AI model built with Next.js and Tailwind CSS. This application provides a seamless conversational experience with Google's latest AI model.
✨ Features

🚀 Real-time AI responses using Google's Gemini API
💾 Persistent chat history with localStorage
📋 Copy message functionality
💅 Modern, responsive UI with gradient effects
⌨️ Smart input handling with message context
🔄 Loading states and error handling
🎨 Beautiful design with Tailwind CSS
📱 Mobile-first responsive interface
🧹 Conversation clearing functionality
⚡ Optimized API communication with axios

🛠️ Tech Stack

Next.js 14
React 18 (with Hooks)
Tailwind CSS 3
React Icons
Google Gemini API
Axios
localStorage for persistence

📋 Prerequisites
Before you begin, ensure you have:

Node.js 18+ installed
A Google Cloud account
Gemini API key (v1beta access)

🚀 Installation

Clone the repository:

bashCopygit clone [repo-url]
cd gemini-chat

Install dependencies:

bashCopynpm install

# or

yarn install

Set up environment variables:
Create a .env.local file:

envCopyGOOGLE_GEMINI_API_KEY=your_api_key_here

Start the development server:

bashCopynpm run dev

# or

yarn dev
🔌 API Configuration
Gemini API Handler
The application includes a dedicated API handler (/pages/api/gemini.js) that manages communication with the Gemini API. Key features include:

Request validation
Context management
Error handling
Configurable generation parameters

API Setup Steps

Go to Google Cloud Console
Create a new project
Enable Gemini API
Create API credentials
Add API key to .env.local

💡 Key Components
Chat Interface (GeminiChat.js)

Real-time message handling
Persistent chat history
Copy functionality
Loading states
Error management
Responsive design

Fluid typography
Responsive spacing
Adaptive layouts
Touch-friendly interface elements
Optimized input handling for mobile devices

🔒 Security Features

Environment variable protection
Server-side API handling
Input sanitization
Rate limiting (recommended to implement)
Error boundaries

🚀 Performance Optimizations

Efficient state management
Debounced API calls
Optimized re-renders
Local storage caching
Lazy loading components

🔄 Version History
Version 1.0.0

✨ Initial release
🎨 Basic chat interface
🔌 Gemini API integration

Version 1.1.0

💾 Added localStorage persistence
📋 Copy functionality
🎯 Improved error handling

Version 1.2.0

📱 Enhanced mobile responsiveness
🧹 Chat clearing functionality
🎨 UI/UX improvements

🤝 Contributing

Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Open a pull request

🐛 Known Issues

Large message history may impact performance
Mobile keyboard can affect scroll behavior
API rate limiting needs implementation

📄 License
MIT License - feel free to use this project for your own purposes.
🙏 Acknowledgments

Google Gemini API Team
Next.js Team
Tailwind CSS Team
React Icons Contributors
Open Source Community

Made with ❤️ and ☕
📞 Support
For issues and feature requests, please use the GitHub issues page.
