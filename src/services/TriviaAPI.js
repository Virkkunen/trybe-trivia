const fetchToken = async () => {
  const getToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const fetchResponse = await getToken.json();

  return fetchResponse.token;
};

export default fetchToken;
