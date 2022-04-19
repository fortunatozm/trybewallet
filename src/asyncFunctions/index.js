const getCurrency = async () => {
  const answer = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await answer.json();
  return response;
};

export default getCurrency;
