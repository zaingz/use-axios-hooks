import { useEffect, useReducer, useRef, useCallback } from "react";
import axios, { CancelToken } from "axios";

import reducer, { actions, initialState } from "./reducer";

/**
 * useAxios
 * @param {string | options} options
 * @param {boolean} manual - True: to execute the fetch onMount
 * @example
 * const [state, execute, cancel] = useAxios("/api", false);
 */
export default function useAxios(options, manual = true) {
  if (typeof options === "string") {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: "GET"
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const cancel = useRef();

  const fetch = useCallback(async () => {
    dispatch({ type: actions.REQUEST_START });
    try {
      const response = await axios({
        ...options,
        ...{
          cancelToken: new CancelToken(c => {
            cancel.current = c;
          })
        }
      });
      dispatch({ type: actions.REQUEST_SUCCESS, payload: response });
    } catch (e) {
      if (axios.isCancel(e)) {
        dispatch({ type: actions.REQUEST_CANCEL });
        return;
      }
      dispatch({ type: actions.REQUEST_FAIL, payload: e });
    }
  }, [options]);

  useEffect(() => {
    manual && fetch();
    return () => cancel.current("useAxios cancelled on component un-mount");
  }, [fetch, manual]);

  return [state, fetch, cancel.current];
}
