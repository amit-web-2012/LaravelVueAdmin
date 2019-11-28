<template>
<div class="col-md-12">
<div class="card card-primary">
    <div class="card-header">
    <h3 class="card-title">{{user.name}} Profile</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->
    <form @submit.prevent="profileUpdate" enctype="multipart/form-data">
    <div class="card-body">

        <div class="form-group">
        <label for="formName">Name</label>
        <input type="text" v-model="user.name" name="name" id="name" value="{user.name}" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('name') }" class="form-control" placeholder="Enter Name">
        <p v-if="submitted && errors.has('name')" class="invalid-feedback">
            {{ errors.first("name") }}
        </p>
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" v-model="user.email" value="{user.email}" class="form-control" id="formEmail" disabled>
        </div>
        {{user}}
        <div class="form-group image-cropper"  v-if="user.imageData">
            <img :src="user.imageData" alt="User Image" class="profile-pic">
        </div>
        <div class="form-group">
        <label for="exampleInputFile">Profile Image</label>
        <div class="input-group">
            <div class="custom-file">
            <input type="file" id="profileImage" ref="profileImage" @change="previewImage" accept="image/*" class="custom-file-input">
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
                imageData:''
            },
            submitted: false,
        }
    },
    mounted: function() {
        return new Promise((resolve, reject) => {
            axios.post('/profile', {
                id: this.user.id
            }).then(response => {
                console.log(response.data.responseData);
                this.user.name = response.data.responseData.name
                this.user.email = response.data.responseData.email
                this.user.imageData = response.data.responseData.profle_image
                resolve(response)
            }).catch(error => {
                reject(error);
            });
        });
    },
    methods: {
        previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.user.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
        profileUpdate() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if(valid) {
                    let formData = new FormData();
                    formData.append('id', this.user.id);
                    formData.append('name', this.user.name);
                    formData.append('profile_image', this.$refs.profileImage.files[0]);
                    return new Promise((resolve, reject) => {
                        axios.post('/updateProfile',
                            formData,
                                {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                        }).then(response => {
                            const responseData = response.data.responseData;
                                localStorage.setItem('myname', responseData.name)
                                localStorage.setItem('email', responseData.email)
                                localStorage.setItem('profile_image', responseData.profile_image)
                            this.$store.commit('updateProfile', responseData);
                            resolve(response)
                        }).catch(error => {
                            reject(error)
                        });
                    });
                }
            });
        }
    }
}
</script>
