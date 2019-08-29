import React, {useState} from 'react'

import './styles.css'

import { useAxios, useAxiosRetry, useAxiosInterval } from 'use-axios-hooks'

const Demo = () => {
  const [state, cancel] = useAxios(
    'http://www.interval.io/v2/5d61663832000059008e60cb'
  )

  const [stateR, cancelR] = useAxiosRetry(
    {
      method: 'GET',
      url: 'http://www.interval.io/v2/5d61663832000059008e60cb'
    },
    {
      retryCount: 3,
      retryInterval: 2000
    }
  )

  const [stateI, cancelI] = useAxiosInterval(
    {
      method: 'GET',
      url: 'http://www.mocky.io/v2/5d61663832000059008e60cb'
    },
    1000
  )

  const items = [
    { title: 'useAxios', state, cancel },
    { title: 'useAxiosRetry', state: stateR, cancel: cancelR },
    { title: 'useAxiosInterval', state: stateI, cancel: cancelI }
  ].map(item => <DemoSections key={item.title} {...item} />)

  return (
    <div>
      <h1>useAxios lib Demo</h1>
      {items}
    </div>
  )
};

const DemoSections = props => {
  const { title, state, cancel } = props
  return (
    <section>
      <div className='content'>
        <h3>{title}</h3>
        {state.isLoading && 'Loading...'}
        {state.data && !state.isLoading && JSON.stringify(state.data.data)}
        {state.error && !state.isLoading && JSON.stringify(state.error.message)}
        <br />
      </div>
      Cancelled: {JSON.stringify(state.isCanceled)}
      <button type='button' onClick={() => cancel()}>
        Cancel
      </button>
    </section>
  )
};

const App = props => {
  const [show, setShow] = useState(true)

  return (
    <div>
      App
      <button onClick={() => setShow(s => !s)}>Tog gle Component</button>
      {show ? <Demo /> : null}
    </div>
  )
};

export default App
