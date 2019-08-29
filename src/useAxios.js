import { useEffect, useReducer, useRef } from 'react'
import axios, { CancelToken } from 'axios'

import reducer, { actions, initialState } from './reducer'

export default function useAxios(options) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const cancel = useRef()
  useEffect(() => {
    (async () => {
      dispatch({ type: actions.REQUEST_START })
      try {
        const response = await axios({
          ...options,
          ...{
            cancelToken: new CancelToken(c => {
              cancel.current = c
            })
          }
        })
        dispatch({ type: actions.REQUEST_SUCCESS, payload: response })
      } catch (e) {
        if (axios.isCancel(e)) {
          dispatch({ type: actions.REQUEST_CANCEL })
          return
        }
        dispatch({ type: actions.REQUEST_FAIL, payload: e })
      }
    })()

    return () => cancel.current('useAxios cancelled on component un-mount')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)])

  return [state, cancel.current]
}
