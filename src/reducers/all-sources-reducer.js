import { REQUEST_SOURCES, RECEIVE_ALL_SOURCES, ERROR_SOURCES } from '../actions/sources-actions'

let initialState = {
  isFetching: false,
  error: null,
  sources: []
}

const sourcesById = sources => {
  let newSources = {}
  sources.map(source => {
    return newSources[source.id] = source
  })
  return newSources;
}

export default function (state=initialState, { type, payload }) {
  switch (type) {
    case REQUEST_SOURCES:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_ALL_SOURCES:
      return {
        ...state,
        isFetching: false,
        sources: sourcesById(payload.data),
        lastUpdated: payload.receivedAt,
      }
    case ERROR_SOURCES:
      return {
        ...state,
        error: payload.error
      }
    default:
      return state
  }
}
