import { useEffect, useReducer, useRef } from 'react'
import axios, { CancelToken } from 'axios'

import reducer, { actions, initialState } from './reducer'

export default function useAxiosRetry(options, retryOptions) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    }
  }

  const { retryCount, retryInterval } = retryOptions

  const [state, dispatch] = useReducer(reducer, initialState)

  const cancelToken = useRef([])
  const gRetryCount = useRef(retryCount + 1)
  const interval = useRef()

  useEffect(() => {
    async function fetch(config) {
      if (gRetryCount.current === 0) {
        return
      }
      dispatch({ type: actions.REQUEST_START })
      try {
        const response = await axios({
          ...config,
          ...{
            cancelToken: new CancelToken(c => {
              cancelToken.current.push(c)
            })
          }
        })
        dispatch({ type: actions.REQUEST_SUCCESS, payload: response })
      } catch (e) {
        if (axios.isCancel(e)) {
          return
        }
        dispatch({ type: actions.REQUEST_FAIL, payload: e })

        interval.current = setTimeout(() => {
          gRetryCount.current -= 1
          fetch(config)
        }, retryInterval)
      }
    }

    fetch(options)

    const canc = cancelToken.current
    return () => {
      canc.forEach(c => {
        c()
      })

      clearTimeout(interval.current)
    };
  }, [JSON.stringify(options), JSON.stringify(retryOptions)])

  const cancelCallback = () => {
    dispatch({ type: actions.REQUEST_CANCEL })
    clearTimeout(interval.current)
    cancelToken.current.forEach(c => {
      c()
    })
    gRetryCount.current = 0
  };

  return [state, cancelCallback]
}
