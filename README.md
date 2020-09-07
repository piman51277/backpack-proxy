# backpack-proxy
Proxies requests to the backpack.tf listings API.

## Environment Variables
- BPAPIKEY - The API key to use in the forwarded requests.
- APIKEY - The API key identifying the pricing server.

## Requests
Send requests to the server with this format:
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




