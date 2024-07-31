export const getData = async (endpoint: string) => {
    try {
      console.log('Fetching data from:', endpoint);
  
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Data fetching error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching data:', error);
      throw error;
    }
  };
  