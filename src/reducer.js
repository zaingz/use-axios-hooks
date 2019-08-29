export const actions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_SUCCESS: 'REQUEST_END',
  REQUEST_CANCEL: 'REQUEST_CANCEL',
  REQUEST_FAIL: 'REQUEST_FAIL'
}

export const initialState = {
  isLoading: false,
  error: null,
  data: null,
  isCanceled: false
}

export default function reducer(state, action) {
  switch (action.type) {
    case actions.REQUEST_START:
      return {
        ...state,
        isLoading: true
      }
    case actions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      }
    case actions.REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload
      }
    case actions.REQUEST_CANCEL:
      return {
        ...state,
        isLoading: false,
        isCanceled: true
      }
    default:
      return { ...state }
  }
}
