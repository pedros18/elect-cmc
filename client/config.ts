// config.ts
interface Config {
    baseUrl: string;
  }
  
  const checkConfig = (server: string): Config => {
    let config: Config;
  
    switch (server) {
      case "production":
        config = {
          baseUrl: "https://your-production-url.com",
        };
        break;
      case "local":
        config = {
          baseUrl: "http://localhost:5000",
        };
        break;
      default:
        throw new Error(`Unknown server type: ${server}`);
    }
  
    return config;
  };
  
  export const selectServer = "local"; // Change this to "production" when deploying
  export const config = checkConfig(selectServer);
  