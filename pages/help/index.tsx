import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';

const Help: FunctionComponent = () => {
  useEffect(() => {
    console.log('kek');
    (async () => {
      //       await axios.get('https://www.rcsb.org/search/suggest/43');
      //  fetch data from protein bank api and allow cors

      //   fetch from pokeapi
      //   const resp = await axios.get('https://pokeapi.co/api/v2/pokemon/1/');
      //   console.log(resp);

      //   fetch('https://www.rcsb.org/search/suggest/43', {
      //     method: 'GET',
      //     mode: 'cors',
      //     headers: {
      //       accept:
      //         'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      //       'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      //       'cache-control': 'max-age=0',
      //       'if-none-match': 'W/"2c86-djG94XWYXB2qvXx43peRwBz9wPY"',
      //       'sec-fetch-dest': 'document',
      //       'sec-fetch-mode': 'navigate',
      //       'sec-fetch-site': 'none',
      //       'sec-fetch-user': '?1',
      //       'upgrade-insecure-requests': '1',
      //     },
      //     referrerPolicy: 'strict-origin-when-cross-origin',
      //     body: null,
      //     credentials: 'include',
      //   });
      var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch('https://www.rcsb.org/search/suggest/43', {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Allow-Cross-Origin': '*',
        },
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    })();
  }, []);

  return <div>Help</div>;
};

export default Help;
