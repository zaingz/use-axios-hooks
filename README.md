

  



# use-axios-hooks

  

> axios hooks for common api calls scenarios  

 [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

 - Simple and easy to use, no configuration needed.
 - Built on top of [axios](https://github.com/axios/axios) api. 
 - Ability to retry if api call fails.
 - Ability to do api polling.
 - Ability to cancel in flight api calls.
 - Plays nicely with react components lifecycles. 
 

## Install

  

```bash
npm install --save axios use-axios-hooks
```

  

## Usage

  
###  useAxios  --- hook for making api calls
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
		<button onCLick={() => cancel()}>Cancel Request</button>
	</div>
	)

}

```

  

## License

  

MIT © [zaingz](https://github.com/zaingz)

  

---

  

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).