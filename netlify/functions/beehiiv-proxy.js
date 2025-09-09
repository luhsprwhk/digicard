export const handler = async event => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get environment variables
  const API_KEY = process.env.BEEHIIV_API_KEY;
  const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

  if (!API_KEY || !PUBLICATION_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Beehiiv API key or Publication ID is not configured',
      }),
    };
  }

  try {
    // Make request to Beehiiv API
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/posts?limit=1&status=confirmed&sort_by=publish_date&direction=desc`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Beehiiv API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching from Beehiiv:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch posts from Beehiiv' }),
    };
  }
};
