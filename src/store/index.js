import { createStore } from 'vuex'
import { firebase, usersCollection } from '@/firebase'
import router from '@/router'

export default createStore({
  state: {
    isAuthentificated: false,
    user: null,
    users: []
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUsers (state) {
      return state.users
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
    },
    setUsers (state, payload) {
      state.users = payload
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

          usersCollection.doc(user.uid).set({
            displayName: name,
            email: user.email,
            uid: user.uid
          })

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
    userLogin ({ commit, dispatch }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user)
          commit('setIsAuthentificated', true)
          router.push('/') // or router.push('/dashboard')

          dispatch('fetchUsers', user)
        })
        .catch((err) => {
          console.log(err)
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
          router.push('/login')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthentificated', false)
          router.push('/')
        })
    },
    userResetPassword ({ commit }, { email }) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Reset password')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async fetchUsers ({ commit }, user) {
      usersCollection
        .get()
        .then(querySnapshot => {
          const usersArray = []

          querySnapshot.forEach(doc => {
            const userProfile = doc.data()
            // userProfile.name = doc.name
            usersArray.push(userProfile)
            console.log(usersArray)
          })

          commit('setUsers', usersArray)
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
