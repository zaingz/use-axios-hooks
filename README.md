

  



# use-axios-hooks

  

> axios hooks for common network calls scenarios  

 [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

 - Simple and easy to use, no configuration needed.
 - Built on top of [axios](https://github.com/axios/axios) api. 
 - Ability to retry if api call fails.
 - Ability to do api polling.
 - Ability to cancel in flight api calls.
 - Plays nicely with react component life cycle. 
 

## Installation

  

```bash
npm install --save axios use-axios-hooks
```
Axios is `peerDependency` of this lib so make sure you install axios separately.
  

## Usage
```jsx

import  React,  {  Component  }  from  'react'
import  {  useAxios }  from  'use-axios-hooks'


const  Example  =  ()  =>  {
const  [{data, isLoading, error, isCanceled},  cancel] = useAxios('http://my-awesome-api/endpoint')

return (
	<div>
		{isLoading  &&  'Loading...'}
		{data && JSON.stringify(data)}
		{error && JSON.stringify(error)}
		<button onCLick={() => cancel()>
			Cancel Request
		</button>
	</div>
	)

}

```

## API

#### useAxios(url | config) 

Basic hook to make network calls.
 
 - `url | config` The request url or axios [request config](https://github.com/axios/axios#request-config) object.

 Returns
 `[{data, isLoading, error, isCanceled},  cancel]`

 - `data` The response object returned by axios.
 - `isLoading` Boolean to indicate if request is started but not completed.
 - `error` Error object returned by axios.
 - `isCancelled` Boolean to indicate if request is canceled.
 `cancel` Function to cancel pending network call. (It uses axios [cancellation](https://github.com/axios/axios#cancellation) api).

 #### useAxiosRetry(url | config, options) 

 Hook to retry network call on error.
 
 - `url | config` The request url or axios [request config](https://github.com/axios/axios#request-config) object.

 - `options` Configuration to specify retry options i.e `{ retryCount: number, retryInterval: milliseconds }`

 Returns
 `[{data, isLoading, error, isCanceled},  cancel]`

 - `data` The response object returned by axios.
 - `isLoading` Boolean to indicate if request is started but not completed.
 - `error` Error object returned by axios.
 - `isCancelled` Boolean to indicate if request is canceled.
 `cancel` Function to cancel retying.

#### useAxiosInterval(url | config, interval) 

 Hook to make continuos network call after an interval (long polling). 
 
 - `url | config` The request url or axios [request config](https://github.com/axios/axios#request-config) object.

 - `interval` Interval in milliseconds in which network will be made.

 Returns
 `[{data, isLoading, error, isCanceled},  cancel]`

 - `data` The response object returned by axios.
 - `isLoading` Boolean to indicate if request is started but not completed.
 - `error` Error object returned by axios.
 - `isCancelled` Boolean to indicate if request is canceled.
 `cancel` Function to cancel the polling.

 

  

## License

  

MIT © [zaingz](https://github.com/zaingz)

  

---

  

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).