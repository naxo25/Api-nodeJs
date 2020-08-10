<template>
  <q-page class="flex q-pa-md">
    <q-img src='https://nacholabraweb.000webhostapp.com/imagesChat/pp.jpg' width='90%' style='margin:auto' />
  	<q-card class="card" flat>

      <q-form @submit="ingresar">
        <q-input
          v-model="formData.email"
          onkeyup="javascript:this.value=this.value.toLowerCase();"
          label="Ingresa tu correo" />
        <q-input
          v-model="formData.password"
          type="password"
          class="q-mb-md"
          label="Ingresa tu contraseña" />
        <q-btn
          class='btn-inicio'
          type="submit"
          label="Iniciar sesión" />
      </q-form>
        <q-btn
          flat
          to='/Registro'
          class="full-width"
          label="Registrarse" />
          
      <q-item>
        2020 ED@ y condiciones
      </q-item>

    </q-card>
  </q-page>
</template>

<script>
  import { mapActions } from 'vuex'
	export default {
	  data () {
	    return {
        formData: {
          email: '',
          password: ''
        }
	    }
	  },
    methods:{      
      ...mapActions('store', ['loginUser']),
          ingresar (){                
            this.loginUser()
          }
      }
	  }
</script>

<style>
.q-card{
  width:90%; 
  height: 100%; 
  margin: auto
}
.btn-inicio{
  width: 100%; 
  border-radius: 25%
}
</style>