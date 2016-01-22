'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as usersActions from '../constants/users'
import * as authActionsImpl from './auth'

export function getUsers () {
  return (dispatch) => {
    dispatch({type: usersActions.GET_USERS_REQUEST})

    Request
      .get('/api/user')
      .end((err, resp) => {

        if (resp.unauthorized){
          dispatch(authActionsImpl.logout())
        }
        else if (err || !resp.body) {
          dispatch({
            type: usersActions.GET_USERS_RESPONSE,
            niceError: 'Can\'t fetch users',
            hasError: true,
            result: null
          })
        }
        else {
          dispatch({
            type: usersActions.GET_USERS_RESPONSE,
            niceError: null,
            hasError: false,
            result: resp.body.data
          })
        }
      })
  }
}
