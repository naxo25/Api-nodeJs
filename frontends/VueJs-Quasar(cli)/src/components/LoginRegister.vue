<template>
	<q-form @submit="submitForm">
		<q-input
			v-if="tab == 'register'"
			v-model="Datos.name"
			class="q-mb-md"
			label="Name" />
		<div class='flex'>
		<q-input
			v-model="Datos.nombre_usuario"
			class="q-mb-md" style='width:65%'
			onkeyup="javascript:this.value=this.value.toLowerCase();"
			label="Email" />
		<q-input
			v-model="Datos.tipoEmail"
			class="q-mb-md" style='width:35%'
			onkeyup="javascript:this.value=this.value.toLowerCase();"
			label="tipo de correo" />
		</div>
		<q-input
			v-model="Datos.contrasena"
			class="q-mb-md"
			type="contrasena"
			label="contrasena" />
		<div class="row">
			<q-space />
			<q-btn
				color="primary"
				type="submit"
				:label="tab" />
		</div>
	</q-form>
</template>

<script>
	import { mapActions } from 'vuex'
	import axios from 'axios'

	export default {
		props: ['tab'],
		data() {
			return {
				Datos: {
					name: '',
					nombre_usuario: '',
					tipoEmail: '@gmail.com',
					contrasena: ''
				}
			}
		},
		methods: {
			...mapActions('store', ['registerUser', 'loginUser']),
                ingresar (){
                  var formData = new FormData();
                  formData.append('nombre_usuario', this.Datos.nombre_usuario);
                  formData.append('contrasena', this.Datos.contrasena);                  
                  this.loginUser(formData)
                },
				submitForm() {
				if (this.tab == 'login') {  
					this.ingresar()
				}
				else {
					this.registerUser(this.formData)
				}
			}
		}
	}
</script>