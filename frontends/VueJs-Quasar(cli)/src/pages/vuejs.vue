<template>
  <q-page class="full-width q-pa-md">


            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tarea, index) in tareas">
                        
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == index">
                                <!-- Formulario para actualizar -->
                                <input v-model="tareaActualizar" type="text" class="form-control">
                            </span>
                            <span v-else>
                                <!-- Dato tarea -->
                                {{ tarea.tarea }}
                            </span>
                        </td>
                        <td width="35%">
                            <span v-if="formActualizar && idActualizar == index">
                                <!-- Formulario para actualizar -->
                                <input v-model="fechaActualizar" type="text" class="form-control">
                            </span>
                            <span v-else>
                                <!-- Dato fecha -->
                                {{ tarea.fecha }}
                            </span>
                        </td>

                        <td>
                            <!-- Botón para guardar la información actualizada -->
                            <span v-if="formActualizar && idActualizar == index">
                                <a @click="editar(tarea)" class="waves-effect waves-light btn-small">
                                Guardar</a>
                                <a @click="ocultarActualizar" class="waves-light waves-effect btn-small">Cancelar</a>
                            </span>
                            <span v-else>
                                <!-- Botón para mostrar el formulario de actualizar -->
                                <a @click="verFormActualizar(index)" class="waves-effect waves-light btn-small">
                                Actualizar</a>
                                <!-- Botón para borrar -->
                                <a @click="borrar(tarea)" class="waves-effect waves-light btn-small">Borrar</a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

  </q-page>
</template>

<script>
  import firebase from 'firebase'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        noimg: 'https://labs357.com/nuevo/wp-content/themes/consultix/images/no-image-found-360x250.png',
        imgPre: '',
        nombre: 'naxo.jpg',
        uploadValue: 0,
        imageData: '',
        img: '',
        imagen: ''
      }
    }, 
      created: function(){
    console.log("mounted");
    this.listar();
  },

  methods: {
    listar: function(){
        axios.post(this.url, {opcion:4}).then(response =>{
           this.tareas = response.data; }) 
    },
    save: function(){
      axios.post(this.url, {opcion:1, tarea:this.tarea, fecha:this.fecha }).then(response =>{
            this.listar();
        });        
         this.tarea = ""
         this.fecha = ""
    },  
    //Procedimiento EDITAR.
    editar:function(tareas){
       axios.post(this.url, {opcion:2, tarea_id:tareas.tarea_id, tarea: this.tareaActualizar, fecha: this.fechaActualizar }).then(response =>{
          this.ocultarActualizar()
          this.listar();
        });               
    },    
    //Procedimiento BORRAR.
    borrar:function(tareas){
        var r = confirm("¿Está seguro de borrar el registro ?");
        if (r == true) { 
            axios.post(this.url, {opcion:3, tarea_id:tareas.tarea_id}).then(response =>{ 
                this.listar();
            });
        }

    },

                    creartarea: function () {
                        // Anyadimos a nuestra lista
                        this.tareas.push({
                            //id: + new Date(),
                            tarea: this.tarea,
                            fecha: this.fecha
                        });
                        // Vaciamos el formulario de añadir
                        this.tarea = '';
                        this.fecha = '';
                    },
                    verFormActualizar: function (tarea_id) {
                        // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                        this.idActualizar = tarea_id;
                        this.tareaActualizar = this.tareas[tarea_id].tarea;
                        this.fechaActualizar = this.tareas[tarea_id].fecha;
                        // Mostramos el formulario
                        this.formActualizar = true;
                    },
                    ocultarActualizar: function () {
                        // Oculto el formu
                        this.formActualizar = false;
                    },
                    borrartarea: function (tarea_id) {
                        // Borramos de la lista
                        this.tareas.splice(tarea_id, 1);
                    },
                    guardarActualizacion: function (tarea_id) {
                        // Ocultamos nuestro formulario de actualizar
                        this.formActualizar = false;
                        // Actualizamos los datos
                        this.tareas[tarea_id].tarea = this.tareaActualizar;
                        this.tareas[tarea_id].fecha = this.fechaActualizar;
                    }
                }
  }

</script>