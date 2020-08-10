<template>
  <q-layout view="lHh Lpr lFf" style='margin: auto; text-align:left'>

  <div class='animate-bottom absolute-center' style='display:block' id="loader"></div>
  <div style="display: none" id="myDiv" class="full-width">

    <q-page-container> 
      <router-view />
    </q-page-container>

  </div>

  </q-layout>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        noimg: 'https://labs357.com/nuevo/wp-content/themes/consultix/images/no-image-found-360x250.png',
        info: false,
        tab: 'mails'
      }
    },
    computed: {
      ...mapState('store', ['userDetails']),
      title() {
        let currentPath = this.$route.fullPath
        if (currentPath.includes('/chat')) return this.otherUserDetails.name
        else if (currentPath == '/Agregar') return 'solicitudes'
        else if (currentPath == '/Perfil') return 'cuenta'
        else if (currentPath == '/') return 'chats'
      }
    },
    created () {
        this.loader()
    },
    methods: {
      ...mapMutations('store', ['exit']),
      loader() {      
            setTimeout(showPage, 2000)
            function showPage() {
              document.getElementById("loader").style.display = "none";
              document.getElementById("myDiv").style.display = "block";
            }
          this.$q.notify({
            message: 'Bienvenido',
            color: 'blue',
            position: 'top'
          })
      },
      salir(){
        this.exit()
      }
    }
  }

</script>

<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.2
  *
    font-weight: bold  

/* Center the loader */
#loader {
  background: url(https://d31i9b8skgubvn.cloudfront.net/assets/img/loading.gif);
   position: absolute;
    width: 300px;
    height: 300px;
}

</style>