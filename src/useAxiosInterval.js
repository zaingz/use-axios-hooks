import { useEffect, useReducer, useRef } from 'react'
import axios, { CancelToken } from 'axios'

import reducer, { actions, initialState } from './reducer'

export default function useAxiosInterval(options, interval) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef()
  const cancel = useRef()
  const cancelToken = useRef([])

  useEffect(() => {
    const fetch = async config => {
      dispatch({ type: actions.REQUEST_START })
      try {
        if (cancel.current) {
          throw new Error({ isCancel: true })
        }
        const response = await axios({
          ...config,
          cancelToken: new CancelToken(c => {
            cancelToken.current.push(c)
          })
        })
        dispatch({ type: actions.REQUEST_SUCCESS, payload: response })
      } catch (e) {
        if (axios.isCancel(e)) {
          return
        }
        dispatch({ type: actions.REQUEST_FAIL, payload: e })
      }
    }

    intervalId.current = setInterval(() => {
      fetch(options)
    }, interval)

    const canc = cancelToken.current
    return () => {
      canc.forEach(c => {
        c()
      })
      clearInterval(intervalId.current)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options), interval])

  const cancelHandler = () => {
    dispatch({ type: actions.REQUEST_CANCEL })
    cancel.current = true
    cancelToken.current.forEach(c => {
      c()
    })
    clearInterval(intervalId.current)
  };

  return [state, cancelHandler]
}
