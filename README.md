# ChatGPT Clone

A simple ChatGPT-like clone built with React and Vite.

## Features

- Chat interface with AI responses
- Uses OpenAI API for AI responses

## Setup

1. Get an OpenAI API key from [OpenAI](https://platform.openai.com/api-keys).

2. Create a `.env` file in the root directory and add:

   ```
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser to `http://localhost:5173` and start chatting!

## Note

This is a basic implementation. For production use, consider server-side API calls to keep the API key secure.
