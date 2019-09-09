import { MENUS_ACTIONS, MENUS_MUTATIONS } from './consts'
import api from '../../plugins/api'

export const actions = {
  [MENUS_ACTIONS.FETCH_MENUS] ({ commit }) {
    return api.get('/api/menus')
      .then(res => res.data)
      .then(menus => {
        return commit(MENUS_MUTATIONS.SET_MENUS, menus)
      })
  },
  [MENUS_ACTIONS.FETCH_MENU] ({ commit }, name) {
    commit(MENUS_MUTATIONS.SET_UPDATED_LINKS, null)
    commit(MENUS_MUTATIONS.SET_CURRENT_MENU, null)
    return api.get('/api/menus/' + name)
      .then(res => res.data)
      .then(menu => {
        return commit(MENUS_MUTATIONS.SET_CURRENT_MENU, menu)
      })
  },
  [MENUS_ACTIONS.UPDATE_MENU_LINKS] ({ commit }, links) {
    commit(MENUS_MUTATIONS.SET_UPDATED_LINKS, links)
  }
}
