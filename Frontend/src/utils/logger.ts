import axios from 'axios';

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYXYyMmNzZUBjbXJpdC5hYy5pbiIsImV4cCI6MTc1NjEwMDI2NCwiaWF0IjoxNzU2MDk5MzY0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmQ1Nzg5ZjgtM2I2My00MWI1LThhNGMtN2RiNDJhYTBmN2RiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWF0aGVzaCB2Iiwic3ViIjoiOGZhODU5M2UtNTgzYi00OGUwLWExZjctZDRjYmExMTU5MDMzIn0sImVtYWlsIjoibWF2MjJjc2VAY21yaXQuYWMuaW4iLCJuYW1lIjoibWF0aGVzaCB2Iiwicm9sbE5vIjoiMWNyMjJjczIyNSIsImFjY2Vzc0NvZGUiOiJ5VVZRWEsiLCJjbGllbnRJRCI6IjhmYTg1OTNlLTU4M2ItNDhlMC1hMWY3LWQ0Y2JhMTE1OTAzMyIsImNsaWVudFNlY3JldCI6Ik1nRm5ZcGV4R1dXQmFWYlgifQ.IMIsDX-q6NhHCb-lCEyxCa_EvAE4B2XFMEIlfveUe68';

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
