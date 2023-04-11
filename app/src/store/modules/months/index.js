import axios from 'axios'
import {
  queryFormatter
} from '../../../helpers/queryFormatter'

const state = {
  entries: [],
  editingEntry: {},
  editingGallery: {},
}

const mutations = {
  UPDATE_EDITING_ENTRY(state, payload) {
    state.editingEntry = payload
  },
  UPDATE_ENTRIES(state, payload) {
    state.entries = payload
  },
  UPDATE_EDITING_GALLERY(state, payload) {
    state.editingGallery = payload
  },
}

const actions = {
  getEntries({
    commit
  }) {
    return axios.get('/api/entries').then((response) => {
      commit('UPDATE_ENTRIES', response.data)
    })
  },
  updateEntry({
    commit
  }, payload) {
    commit('UPDATE_EDITING_ENTRY', payload.entry)
  },
  saveEntry({
    commit
  }, token) {
    const data = {
      token: token,
      content: getters.editingEntry(state).raw_content,
      entry: getters.editingEntry(state).id,
    }
    return axios({
      method: 'post',
      url: '/api/admin/entry/edit',
      data: queryFormatter(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },
  getEntry({
    commit
  }, payload) {
    return axios
      .get('/api/admin/entry/edit?entry=' + payload.entry + '&token=' + payload.token)
      .then((response) => {
        commit('UPDATE_EDITING_ENTRY', response.data)
      })
  },
  deleteEntry({
    commit
  }, payload) {
    return axios.delete('/api/admin/entry/delete?' + queryFormatter(payload))
  },
  loadMediaForEntry({
    commit
  }, payload) {
    const data = queryFormatter(payload);
    return axios.get('/api/admin/entry/media/load?' + data).then((response) => {
      commit('UPDATE_EDITING_GALLERY', response.data.media);
    })
  },
  uploadRaceReport({commit}, data) {
    return axios({
      method: "POST",
      url: "/api/admin/entry/race-report",
      data: queryFormatter(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}

const getters = {
  entries: (state) => state.entries,
  editingEntry: (state) => state.editingEntry,
  gallery: (state) => state.editingGallery,
}

const monthsModule = {
  state,
  mutations,
  actions,
  getters,
}

export default monthsModule