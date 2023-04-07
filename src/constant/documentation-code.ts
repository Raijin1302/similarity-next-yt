export const nodejs = `const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://similarityapi.com/api/v1/similarity',
    params: {
      text1: 'First text',
      text2: 'Second text'
    },
    headers: {
      'Authorization': 'YOUR_API_KEY',
    }
  };

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`;

export const python = `import requests

url = 'https://similarityapi.com/api/v1/similarity'
api_key = 'YOUR_API_KEY'
text1 = 'First text'
text2 = 'Second text'

headers = {
    'Authorization': api_key
}

payload = {
    'text1': text1,
    'text2': text2
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`;

export const go = `package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://similarityapi.com/api/v1/similarity"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("API-Key", "SIGN-UP-FOR-KEY")
	req.Header.Add("API-Host", "similarityapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`;
