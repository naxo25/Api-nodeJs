<template>
  <q-page class="q-pa-md container"> 

      <div style="height:460px; overflow: scroll; overflow-x: hidden;">
        <section class="data">
          <div class="row">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Selecciona una Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Profesion</th>
                        <th scope="col">Rango</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in users"
                        :key="key">
                        <td>
                            <img :src="item.img != null ? rutaImg+item.img : noimg" style="width: 50px; border-radius: 45%" @click='' :id='key' />
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == key">
                                <input v-model="nombreActualizar" type="text" class="form-control">
                            </span>
                            <span v-else>
                                {{ item.nombre }}
                            </span>
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == key">
                                <input v-model="profesionActualizar" type="text" class="form-control">
                            </span>
                            <span v-else>
                                {{ item.profesion }}
                            </span>
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == key">
                                <input v-model="rangoActualizar" type="text" class="form-control">
                            </span>
                            <span v-else>
                                {{ item.rango }}
                            </span>
                        </td>

                        <td>
                            <span v-if="formActualizar && idActualizar == key">
                                <a @click="editar(item, key)" class="waves-effect waves-light btn-small">
                                Guardar</a>
                                <a @click="formActualizar = false" class="waves-light waves-effect btn-small">Cancelar</a>
                            </span>
                            <span v-else>
                                <a @click="verFormActualizar(key)" class="waves-effect waves-light btn-small">
                                Actualizar</a>

                                <a @click="borrar(key)" class="waves-effect waves-light btn-small">Borrar</a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
        </section>
      </div>

      <section class="form">
            <form>
              <div class="input-field col s6">
                <i class="material-icons prefix">edit</i>
                <label for="icon_prefix" class="active">Nombre</label>
                <input v-model="nombre" id="icon_prefix" type="text" class="validate valid">
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">date_range</i>
                <input v-model="profesion" id="icon_prefix" type="text" class="validate valid">
                <label for="icon_prefix" class="active">Profesion</label>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">date_range</i>
                <input v-model="rango" id="icon_prefix" type="text" class="validate valid">
                <label for="icon_prefix" class="active">Rango</label>
              </div>
              
              <a @click="agregar" class="waves-effect waves-light btn-small">Añadir</a>
            </form>
      </section>
      
    <input hidden filled hint="Native file" id='subir' type="file" @change="" accept="image/*" />

  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        noimg: 'https://h2biz.net/images/no_foto.png',
        rutaImg: 'http://nacholabraweb.000webhostapp.com/imagesChat/',
        nombre: '',
        profesion: '',
        rango: '',
        amigoClick: {},
        nombreActualizar: '',
        profesionActualizar: '',
        rangoActualizar: '',
        formActualizar: false,
        users: {}
      }
    },
    created(){
      this.gets()
    },
    computed: {
      //...mapGetters('store', ['users'])
    },
      methods: {
        ...mapActions('store', ['Editar', 'Borrar', 'Add', 'listar']),
        gets() {
          var url = 'http://localhost:3000/lista';
          axios.get(url).then(snapshot =>{
            
          this.users = snapshot.data
          }); 
        },
        editar (item, key) {
          var formData = {}
          formData.nombre = this.nombreActualizar
          formData.profesion = this.profesionActualizar
          formData.rango = this.rangoActualizar
          this.Editar({ formData, key });
          this.formActualizar = false;
        },
        borrar (key) {
          var r = confirm("¿Está seguro de borrar el registro ?");
          if (r == true) { 
            this.Borrar({ key });
            this.formActualizar = false;
          }
        },
        agregar () {
          var formData = {}
          formData.nombre = this.nombre
          formData.profesion = this.profesion
          formData.rango = this.rango
          this.Add({ formData });          
        },

        editarPhp (item, key) {
                  var formData = new FormData();
                  formData.append('opcion', 2);
                  formData.append('nombre', this.nombreActualizar);
                  formData.append('profesion', this.profesionActualizar);
                  formData.append('rango', this.rangoActualizar);
                  console.log(formData)
          this.Editar({ formData, key });
          this.formActualizar = false;
        },
                    verFormActualizar (item) {
                        this.idActualizar = item;
                        this.nombreActualizar = this.users[item].nombre;
                        this.profesionActualizar = this.users[item].profesion;
                        this.rangoActualizar = this.users[item].rango;
                        this.formActualizar = true;
                    }
      }
  }
</script>

<style lang='stylus'>

/* Center the loader */
#loader {
  background: url(https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif) 50%;
   position: absolute;
    width: 300px;
    height: 300px;
}

#preload
  background: url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png)

</style>