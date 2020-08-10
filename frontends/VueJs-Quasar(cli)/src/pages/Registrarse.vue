<template>
  <q-page class="flex q-pa-md page text-white full-width">
        <q-btn
          flat
          dense 
          v-go-back.single
          label='Volver'
          no-caps/>    

  	<q-card class="card bg-transparent" flat>

      <q-form @submit='register'>
       
          <h4 style='margin-bottom: 20px'>Registro</h4> 
          <p>Completa los siguientes datos ...</p>
        
        <q-input
          v-model="formData.nombre"
          label="Escribe tu nombre" />
        <q-input
          label-color='white'
          v-model="formData.email"
          onkeyup="javascript:this.value=this.value.toLowerCase();"
          label="Escribe tu correo institucional" />
        <q-input
          label-color='white'
          style=' margin-bottom: 80px'
          v-model="formData.password"
          type="password"
          label="Escribe tu contraseña" />
        <q-btn
          style=' margin-bottom: 60px'
          class='btn-inicio'
          type="submit"
          label="Continuar" />
      </q-form>

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
      ...mapActions('store', ['registerUser']),
          register (){                
            this.registerUser()
          }
      }
    }
</script>

<style>
.page{
  background: rgba(73,155,234,1);
  background: -moz-radial-gradient(center, ellipse cover, rgba(73,155,234,1) 0%, rgba(39,37,138,1) 100%);
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(73,155,234,1)), color-stop(100%, rgba(39,37,138,1)));
  background: -webkit-radial-gradient(center, ellipse cover, rgba(73,155,234,1) 0%, rgba(39,37,138,1) 100%);
  background: -o-radial-gradient(center, ellipse cover, rgba(73,155,234,1) 0%, rgba(39,37,138,1) 100%);
  background: -ms-radial-gradient(center, ellipse cover, rgba(73,155,234,1) 0%, rgba(39,37,138,1) 100%);
  background: radial-gradient(ellipse at center, rgba(73,155,234,1) 0%, rgba(39,37,138,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#499bea', endColorstr='#27258a', GradientType=1 );
}
.btn{
  color: white;
}
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