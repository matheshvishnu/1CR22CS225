import axios from 'axios';

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'your_bearer_token_here';

type LogStack = 'backend' | 'frontend';
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export const log = async (stack: LogStack, level: LogLevel, pkg: string, message: string): Promise<void> => {
  try {
    await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Logging middleware failed:', error);
  }
};

// This line explicitly tells TypeScript this is a module.
export {};
