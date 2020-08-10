<template>
  <q-page class="q-pa-md container"> 

      <div style="height:460px; overflow: scroll; overflow-x: hidden;">
        <section class="data">
          <div class="row">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Url</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in users">
                        <td>
                            <img :src="item.img != null ? rutaImg+item.img : noimg" style="width: 50px; border-radius: 45%" @click='' />
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == index">
                                <input v-model="formDataActualizar.title" type="text" class="form-control">
                            </span>
                            <span v-else>
                                {{ item.title }}
                            </span>
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == index">
                                <input v-model="formDataActualizar.url" type="text" class="form-control">
                            </span>
                            <span v-else>
                                <a :href="item.url" target="_blank">{{ item.url }}</a>
                            </span>
                        </td>
                        <td width="35%" hidden>
                            <span v-if="formActualizar && idActualizar == index">
                                <input v-model="formDataActualizar.description" type="text" class="form-control">
                            </span>
                            <span v-else>
                                {{ item.description }}
                            </span>
                        </td>

                        <td>
                            <span v-if="formActualizar && idActualizar == index">
                                <a @click="editar(item, index)" class="waves-effect waves-light btn-small">
                                Guardar</a>
                                <a @click="formActualizar = false" class="waves-light waves-effect btn-small">Cancelar</a>
                            </span>
                            <span v-else>
                                <a @click="verFormActualizar(index)" class="waves-effect waves-light btn-small">
                                Actualizar</a>

                                <a @click="borrar(item, index)" class="waves-effect waves-light btn-small">Borrar</a>
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
                <label for="icon_prefix" class="active">Titulo</label>
                <input v-model="formDataAdd.title" id="icon_prefix" type="text" class="validate valid">
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">date_range</i>
                <input v-model="formDataAdd.url" id="icon_prefix" type="text" class="validate valid">
                <label for="icon_prefix" class="active">Url</label>
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
        noimg: 'https://www.monteselectro.com/assets/img/no_foto/448/no_foto.png',
        rutaImg: 'http://nacholabraweb.000webhostapp.com/imagesChat/',
        formDataAdd: {
          title: '',
          url: '',
          description: ''
        },
        formDataActualizar: {
          title: '',
          url: '',
          description: ''
        },
        amigoClick: {},
        nombreActualizar: '',
        profesionActualizar: '',
        rangoActualizar: '',
        formActualizar: false,
        users: {},
        url: 'http://localhost:4000/backendnode/'
      }
    },
    created(){
      this.gets()
    },
    computed: {
      //...mapGetters('store', ['users'])
    },
      methods: {
                gets (){
                    axios.get(this.url).then(response => {
                       this.users = response.data.nodejs;
                    }) 
                },
                agregar (){
                    axios.post(this.url, this.formDataAdd).then(response =>{
                        this.users.push(response.data);
                        this.formDataAdd.title='';
                        this.formDataAdd.url='';
                        this.formDataAdd.description='';
                    }); 
                },
                editar(tarea, index){
                    axios.put(this.url + tarea.id, this.formDataActualizar).then(response =>{
                        this.users[index] = response.data;
                        this.ocultarActualizar()
                    }); 
                },
                borrar(tarea, index){
                    var r = confirm("¿Está seguro de borrar el registro ?");
                    if (r == true) { 
                        axios.delete(this.url + tarea.id).then(response =>{ 
                            this.users.splice(index, 1);
                        });
                    }
                },
                    verFormActualizar (tarea_id) {
                      console.log(tarea_id)
                        this.idActualizar = tarea_id;
                        this.formDataActualizar = this.users[tarea_id];
                        this.formActualizar = true;
                    },
                    ocultarActualizar () {
                        this.formActualizar = false;
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