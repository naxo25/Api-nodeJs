<template>
  <q-page class="flex q-pa-md"> 
  <div class='animate-bottom absolute-center' style='display:none' id="loader"></div>
  <div style="visibility: visible" id="myDiv" class="full-width">
    <q-list       
      class="full-width"
      style='margin-bottom:50px' 
      separator>
      <q-item-section>
         <q-item v-for='(amigo, key) in amigos'
        :key="key"
        clickable
        v-ripple>
        
          <q-item-section avatar @click="foto(amigo), card = true">
            <q-avatar>
              <img id='preload' :src="amigo.img != null ? amigo.img : noimg" />
            </q-avatar>
          </q-item-section>
                
          <q-item-section class='text-left' @click='go(key)'>
            <q-item-label>{{ amigo.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge @click='go(key)'
              :color="amigo.online ? 'light-green-5' : 'grey-4'">
              {{ amigo.online ? 'Online' : 'Offline' }}
            </q-badge>
          </q-item-section>

        </q-item>
      </q-item-section>
    </q-list>

    <q-dialog v-model="card">
      <q-card class="my-card" style='width: 95%' >
        <q-img :src="amigoClick.img != null ? amigoClick.img : noimg" style='height: 15em' />

        <q-card-section>
            <div class="col text-h6 ellipsis">
              {{amigoClick.name}}    
            </div>
          <q-badge :color="amigoClick.online ? 'light-green-5' : 'grey-4'">
            {{amigoClick.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        noimg: 'https://h2biz.net/images/no_foto.png',
        amigoClick: {},
        card: false
      }
    },
    mounted () {
      if (this.$store.state.store.animacion === 0) { 
        document.getElementById("loader").style.display = "block";
        document.getElementById("myDiv").style.visibility = "hidden"; 
        setTimeout(showPage, 3000)
        function showPage() {
          document.getElementById("loader").style.display = "none";
          document.getElementById("myDiv").style.visibility = "visible";
        }
        this.$store.state.store.animacion++
      }
    },
    computed: {
      ...mapGetters('store', ['amigos'])
    },
    methods: {
      loader() {
      },
      noloader() {
      },
      foto(amigo){
          this.amigoClick.img = amigo.img
          this.amigoClick.name = amigo.name
          this.amigoClick.online = amigo.online
      },
      go(key){      
          this.$router.push('chat/' + key)          
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
  background: rgb(211,211,211)

</style>

/* En users el margin bottom es para que respete el fixed del footer */

          /*<q-item-section side>
            <q-badge 
              :color="amigo.online ? 'light-green-5' : 'grey-4'">
              {{ amigo.online ? 'Online' : 'Offline' }}
            </q-badge>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chat_bubble" color="green" />
          </q-item-section>*/