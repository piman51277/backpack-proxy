# backpack-proxy
Proxies requests to the backpack.tf listings API.

## Environment Variables
- BPAPIKEY - The API key to use in the forwarded requests.
- APIKEY - The API key identifying the pricing server.

## Requests
Note: This server implements a global rate limit of 1 request/second.
Send requests to `/forward` with this format:
```
{
    query:{
        'params':{},
        'apikey':'xxxxxxxx'
    }
}
```
- params - The data to use send to the api. Does not include the API key, as the server's one is used for all requests.
- apikey - The API key that identifies the pricing server.

## Responses

#### 200 - Sucess
Sent when request is sucessful. Sends the data from backpack.tf as a response.
Response:
```
{data}
```
#### 429 - Rate exceeded
The API rate limit was exceeded.
```
{
error:'rate exceeded'
}
```
#### 403 - Invalid API Key
The API key sent with the request was incorrect
```
{
error:'invalid api key'
}
```
#### 400 - Error while forwarding to backpack.tf
An error occured while forwarding request to backpack.tf
```
{
    error: description_of_error
}
```

