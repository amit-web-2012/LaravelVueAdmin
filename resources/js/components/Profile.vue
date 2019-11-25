<template>
<div class="col-md-12">
<div class="card card-primary">
    <div class="card-header">
    <h3 class="card-title">Admin Profile {{user.id}}</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->
    <div class="card-body">
        <div class="form-group">
        <label for="formName">Name</label>
        <input type="text" v-model="user.name" value="{user.name}" class="form-control" id="formName" placeholder="Enter Name">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" v-model="user.email" value="{user.email}" class="form-control" id="formEmail" disabled>
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="formPassword" placeholder="Password">
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input type="password" class="form-control" id="formConfirmPassword" placeholder="Confirm Password">
        </div>
        <div class="form-group">
        <label for="exampleInputFile">Profile Image</label>
        <div class="input-group">
            <div class="custom-file">
            <input type="file" class="custom-file-input" id="exampleInputFile">
            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
            </div>
        </div>
        </div>
    </div>
    <!-- /.card-body -->

    <div class="card-footer">
        <button type="button" class="btn btn-primary" @click="profileUpdate">Submit</button>
    </div>
    </form>
</div>
</div>
</template>

<script>
export default {
    name: 'Profile',
    data: function () {
        return {
            user: {
                id: this.$route.params.id,
                name: '',
                email: '',
            },
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    },
    mounted: function() {
        axios.get('/profile/'+this.user.id).then(response => {
            if (response.status === 302 || 401) {
                console.log(response.status);
            }
            else {
            // throw error and go to catch block
            }
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        profileUpdate() {
            console.log("Submit");
        }
    }
}
</script>
