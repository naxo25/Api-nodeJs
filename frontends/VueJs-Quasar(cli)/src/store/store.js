import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import axios from 'axios'

let messagesRef

const state = {
	sesion: 0,
	userDetails: {},
	users: {},
	amigos: {}
}
const mutations = {
	change(state) {
		state.sesion=1
	},
	exit(state) {
		state.sesion=0
		this.$router.push('/Login')
	}
	,
	addUser(state, payload) {
		Vue.set(state.users, payload.userId, payload.userDetails)
	},
	updateUser(state, payload) {
		Object.assign(state.users[payload.userId], payload.userDetails)
	},
	deleteUser(state, payload) {
		Vue.delete(state.users, payload);
	},

	addFriend(state, payload) {
		Vue.set(state.amigos, payload.userId, payload.userDetails)
	},
	updateFriend(state, payload) {
		Object.assign(state.amigos[payload.userId], payload.userDetails)
	},

	setUserDetails(state, payload) {
		state.userDetails = payload
	},
	limpiar(state) {
		state.userDetails = {}
		state.amigos = {}
		state.solicitudes = {}
		state.user = {}
	}
}
const actions = {	
	registerUser({}, payload) {
		firebaseAuth.createUserWithEmailAndPassword(mail, payload.password)
			.then(response => {				
				let userId = firebaseAuth.currentUser.uid
				firebaseDb.ref('users/' + userId).set({
					name: payload.name,
					email: mail,
					online: true
				})
				let email = mail.split('.')[0]
			})
			.catch(error => {
				alert(error.message)				
			})
	},
	loginUser({dispatch,commit}, payload) {
		/*firebaseAuth.signInWithEmailAndPassword(email, payload.password)
			.then(response => {
				
			})
			.catch(error => {
				alert(error.message)				
			})*/
			//dispatch('listar')
			commit('change')
		    this.$router.push('/')
		//axios.post('http://localhost/Proyectos/ApiVue/private_login.php', payload).then(response =>{}); 
	},
	logoutUser() {
		firebaseAuth.signOut()
	},
	handleAuthStateChanged({ commit, dispatch, state }) {
		//dispatch('listar')
		//dispatch('amigos')
		this.$router.replace('/')
		/*firebaseAuth.onAuthStateChanged(user => {
		  if (!user) {
		    // User is logged in.
		    let userId = firebaseAuth.currentUser.uid	    
		    dispatch('firebaseGetUser')
		    dispatch('firebaseUpdateUser', {
		    	userId: userId,
		    	online: true	    	
		    })
		    dispatch('firebaseGetAmigos')
		    dispatch('firebaseGetSolicitudes')
		    this.$router.push('/')
		  }
		  else {
		  	// User is logged out.
		  	dispatch('firebaseUpdateUser', {
		  		userId: state.userDetails.userId,
		  		online: false
		  	})
		  	commit('limpiar', {})
		  	this.$router.replace('/Login')
		  }
		})*/
	},
	listar({ commit }) {	
		var url2  = 'http://localhost/proyectos/ApiVueNode/Backend/crud.php';
		var url = 'http://localhost:3000/lista';
		axios.get(url).then(snapshot =>{
			for (var key in snapshot.data) {
			let userDetails = snapshot.data[key]
			let userId = snapshot.data[key].id
			commit('addUser', {
				userId,
				userDetails
			})
			}
		}); 
		    /*firebaseDb.ref('users/' + userId).once('value', snapshot => {
		    	let userDetails = snapshot.val()
		    	commit('setUserDetails', {
		    		name: userDetails.name,
		    		email: firebaseAuth.currentUser.email,
		    		userId: userId,
		    		img: userDetails.img
		    	})
		    })*/
	},
	firebaseUpdateUser({}, item) {
		if (item.userId) {
			firebaseDb.ref('users/' + item.userId).update({ online: item.online})
		}
	},

	amigos({ commit }) {
		firebaseDb.ref('users').on('child_added', snapshot => {
			let userDetails = {}
			userDetails.img = snapshot.val().img
			userDetails.name = snapshot.val().name
			userDetails.online = snapshot.val().online
			let userId = snapshot.key
			commit('addFriend', {
				userId,
				userDetails
			})
		})
		firebaseDb.ref('users').on('child_changed', snapshot => {
			let userDetails = {}
			userDetails.img = snapshot.val().img
			userDetails.name = snapshot.val().name
			userDetails.online = snapshot.val().online
			let userId = snapshot.key
			commit('updateFriend', {
				userId,
				userDetails
			})
		})
	},
	firebaseGetAmigos({ commit }) {
		let userId = firebaseAuth.currentUser.uid
		let ruta = 'users/' + userId +'/amigos'
		
		firebaseDb.ref(ruta).on('child_added', snapshot => {	
			let amigoId = snapshot.key
			commit('addAmigo', {
				amigoId
			})
		})
	},
	Editar({ commit,state }, payload) {
		var url2  = 'http://localhost/proyectos/ApiVueNode/Backend/crud.php';
		var url = 'http://localhost:3000/editar/'+payload.key;

            axios.put(url, payload.formData).then(response =>{
            	console.log(response)
				var userId = payload.key
				var userDetails = payload.formData
				commit('updateUser', {
					userId,
					userDetails
				})
			}).then(err => {
				console.log(err)
			});
		//payload.item = 'imagen'
		//firebaseDb.ref('users/' + userId).update({ img: payload.img })
	},
	Borrar({ commit,state }, payload) {
		var url2  = 'http://localhost/proyectos/ApiVueNode/Backend/crud.php';
		var url = 'http://localhost:3000/delete/'+payload.key;

            axios.post(url, payload.formData).then(response =>{
				var userId = payload.key
				var userDetails = payload.formData
				commit('deleteUser', payload.key)
			});
		//payload.item = 'imagen'
		//firebaseDb.ref('users/' + userId).update({ img: payload.img })
	},
	Add({ commit,state }, payload) {
		var url2  = 'http://localhost/proyectos/ApiVueNode/Backend/crud.php';
		var url = 'http://localhost:3000/add/';

            axios.post(url, payload.formData).then(response =>{
				var userDetails = payload.formData
				commit('addUser', {
					userId,
					userDetails
				})
			});
		//payload.item = 'imagen'
		//firebaseDb.ref('users/' + userId).update({ img: payload.img })
	},

	firebaseChangeFoto({ commit,state }, payload) {
		firebaseDb.ref('users/OsqRQHIi4lgRR3PvDoBQLofkxhz2').update({ img: payload.img })
	}

}
const getters = {
	user: state => {
		return state.userDetails
	},
	users: state => {
		let usersFiltered = {}
		Object.keys(state.users).forEach(key => {
			usersFiltered[key] = state.users[key] 
		})
		return state.users;
	},
	amigos: state => {
		let usersFiltered = {}
		Object.keys(state.amigos).forEach(key => {
			usersFiltered[key] = state.amigos[key] 
		})
		return usersFiltered;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}