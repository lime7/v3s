import { createStore } from 'vuex'
import firebase from 'firebase'
import router from '@/router'

export default createStore({
  state: {
    isAuthentificated: false,
    user: null
  },
  getters: {
    getUser (state) {
      return state.user
    },
    isAuthentificated (state) {
      return state.user !== null && state.user !== undefined
    }
  },
  mutations: {
    setIsAuthentificated (state, payload) {
      state.isAuthentificated = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    userRegistration ({ commit }, { name, email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: name
          })
          return userCredential
        })
        .then((userCredential) => {
          const user = userCredential.user
          commit('setUser', user)
          commit('setIsAuthentificated', true)
          router.push('/login')
        })
        .catch((err) => {
          console.log(err)
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
    },
    userLogin ({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user)
          console.log(user)
          commit('setIsAuthentificated', true)
          router.push('/') // or router.push('/dashboard')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
    },
    userLoginGoogle ({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          commit('setUser', result)
          commit('setIsAuthentificated', true)
          router.push('/') // or router.push('/dashboard')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
    },
    userLogout ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(user => {
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
    }
    // userAction ({ commit }) {
    //   firebase
    //     .auth()
    //     .onAuthStateChanged(user => {
    //       if (user) {
    //         commit('setUser', user)
    //       } else {
    //         commit('setUser', null)
    //       }
    //     })
    // }
  },
  modules: {
  }
})
