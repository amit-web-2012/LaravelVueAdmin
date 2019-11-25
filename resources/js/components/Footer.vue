<template>
<footer class="main-footer">
<strong>Copyright &copy; 2014-2019 </strong>
    All rights reserved.
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
      <div class="p-3 control-sidebar-content">
         <h5><a @click.prevent="logout">Logout</a></h5>
      </div>
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</footer>
</template>

<script>
export default {
    name:'footer',
    data: () => ({
        csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }),
    methods: {
        logout: function() {
            axios.post('/logout').then(response => {
                if (response.status === 302 || 401) {
                    this.$router.push({ path: '/' });
                    window.location.reload();
                  }
                else {
                // throw error and go to catch block
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
