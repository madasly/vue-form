<template>
<div id="">
  <el-tabs type="border-card">
    <el-tab-pane label="Formulaire">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row type="flex" justify="center">
          <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <el-upload class="avatar-uploader"  action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
            <el-col :span="12">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Civilité" prop="civilité">
              <el-radio-group v-model="ruleForm.civilité">
                <el-radio required label="M" value="M" name="M"></el-radio>
                <el-radio required label="Madame" value="Madame" name="Madame"></el-radio>
                <el-radio required label="Monsieur" value="Monsieur" name="Monsieur"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre nom" v-model="ruleForm.nom" prop="firstname">
              <el-input  required v-model="tout.firstname" current-change="ruleForm.nom"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre prénom" prop="lastname">
              <el-input  required v-model="tout.lastname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
              <el-form-item label="Votre date de naissance" required>
              <el-form-item prop="Birthdaydate">
                <el-date-picker  required type="date" placeholder="date de naissance" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre email" type="email" prop="email">
              <el-input  required v-model="tout.email" placeholder="Entrez votre email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre téléphone" prop="phone">
              <el-input  required v-model="ruleForm.phone" placeholder="Entrez votre numéro">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Vous êtes un " prop="persona">
              <el-radio-group v-model="ruleForm.persona">
                <el-radio required label="User"></el-radio>
                <el-radio required label="Coach"></el-radio>
                <el-radio required label="Admin"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
          <el-col id="second col":span="12">
          <el-row type="text" required
          v-model="ruleForm.address">
          <el-col :span="20">
              <el-form-item label="Votre adresse">
                <vue-google-autocomplete
            id="map"
            :country="['fr']"
            ref="address"
            v-model="autocompleteText"
            classname="form-control"
            placeholder="renseignez votre adresse"
            v-on:placechanged="getAddressData">
        </vue-google-autocomplete>
        </el-form-item>
            <el-form-item><el-input required placeholder="Ton numéro de rue" v-model="address.street_number"></el-input></el-form-item>
              <el-form-item><el-input required placeholder="Ta rue" v-model="address.route"></el-input></el-form-item>
          <el-form-item><el-input required placeholder="Ton code postal" v-model="address.postal_code"></el-input></el-form-item>
            <el-form-item><el-input required placeholder="Ta ville" v-model="address.locality"></el-input>
              </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="Votre portable" prop="mobile">
                    <el-input v-model="ruleForm.mobile" required placeholder="Entrez votre numéro">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm'), post()">Create</el-button>
                    <el-button type="danger" @click="resetForm('ruleForm')">Reset</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
              </el-row>
        </el-form>
     </el-tab-pane>
  <el-tab-pane label="Tableau">
    <data-tables :data="users" :search-def="searchDef" border style="width: 100%" max-height="250" :col-not-row-click="canNotClickList" :action-col-def="false" @row-click="handleRowClick">
      <el-table-column fixed prop="date" sortable label="Date" width="150">
      </el-table-column>
      <el-table-column prop="firstName" sortable label="Name" width="120">
      </el-table-column>
      <el-table-column prop="lastName" sortable label="Lastname" width="120">
      </el-table-column>
      <el-table-column prop="email"  sortable label="Email" width="180">
      </el-table-column>
      <el-table-column prop="idUserType" sortable label="Status" width="100">
      </el-table-column>
      <el-table-column prop="id" sortable label="Id" width="100">
      </el-table-column>
      <el-table-column sortable label="Operations" width="230">
        <template scope="scope">
            <el-button
              :default="true" type="warning"
              icon="delete"
              @click.native.prevent="deleteRow(scope.$index, users)"
              size="small">
              Supprimer
            </el-button>
            <el-button
              :default="true" type="info"
              icon="edit"
              @click.native.prevent="save(scope.$index, users)"
              size="small">
              Editer
            </el-button>
          </template>
      </el-table-column>
    </data-tables>
  </el-tab-pane>
  </el-tabs>
</div>
</template>
<style lang="scss" scoped>
// Error: Source sample is missing.
</style>
<script>
import axios from 'axios'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  components: { VueGoogleAutocomplete },
  created () {
    // var url = 'https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo'
    this.getUser('https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo')
    console.log(this.users)
  },
  data () {
    return {
      searchDef: {
        props: ''
      },
      tabform: [],
      canNotClickList: [],
      actionColDef: {
        label: 'Actions',
        def: [{
          handler: row => {
            this.$message(row.id + 'clicked')
            row.flow_no = 'hello word'
          },
          size: 'mini',
          type: 'info',
          icon: 'edit',
          name: 'Editer'
        }, {
          handler: index => {
            this.deleteRow(index)
          },
          size: 'xs',
          icon: 'delete',
          type: 'danger',
          name: 'Supprimer'
        }]
      },
      imageUrl: '',
      tout: {
        'id': 110,
        'idUserType': 2,
        'idCustomer': 5,
        'firstName': 'Sully',
        'lastName': 'Neret',
        'email': 'sully@cg.tv',
        'date': 'string'
      },
      autocompleteText: '',
      autocomplete: null,
      users: [],
      address: '',
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        civilité: '',
        nom: '',
        prénom: '',
        email: '',
        phone: '',
        mobile: '',
        zip: '',
        ville: '',
        address: '',
        date: '',
        persona: ''
      },
      rules: {
        civilité: [{
          required: true,
          message: 'Veuillez choisir votre état civil',
          trigger: 'change'
        }],
        firstname: [{
          required: true,
          message: 'Veuillez entrer votre nom',
          trigger: 'blur'
        }],
        lastname: [{
          required: true,
          message: 'Veuillez entrer votre prénom',
          trigger: 'blur'
        }],
        email: [{
          type: 'email',
          required: true,
          message: 'Veuillez entrer votre email',
          trigger: 'blur'
        }],
        phone: [{
          pattern: /^((\+|00)33\s?|0)[1-5](\s?\d{2}){4}$/,
          required: true,
          trigger: 'blur'
        },
        {
          message: 'Veuillez entrer votre numéro de téléphone'
        }
        ],
        mobile: [{
          pattern: /^((\+|00)33\s?|0)[679](\s?\d{2}){4}$/,
          required: true,
          trigger: 'blur'
        },
        {
          message: 'Veuillez entrer votre numéro de portable',
          min: 10,
          max: 10
        }
        ],
        zip: [{
          required: true,
          message: 'Vous devez saisir les 5 chiffres de votre code postal',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 5
        }
        ],
        ville: [{
          required: true,
          message: 'Veuillez saisir votre ville',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: 'Veuillez saisir votre adresse',
          trigger: 'blur'
        }],
        Birthdaydate: [{
          type: 'date',
          required: true,
          message: 'Veuillez sélectionner votre date de naissance',
          trigger: 'change'
        }],
        persona: [{
          required: true,
          message: 'Veuillez choisir votre status',
          trigger: 'change'
        }]
      }
    }
  },

  methods: {
    getUser () {
      // var url = 'https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo'
      axios.get('https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo')
        .then((response) => {
          this.users = response.data
          console.log(this.users)
          console.log('la requete get passe bien')
        })
    },
    post () {
      // var url = 'https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo'
      axios.post('https://swagger-178514.appspot.com/user?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo', {
        'id': '',
        'idUserType': '',
        'idCustomer': '',
        'firstName': 'Sully',
        'lastName': 'Neret',
        'email': 'sully@cgpropro.tv',
        'date': 'string'
      })
      console.log(this.tout)
    },
    created: function () {
      this.getUser()
      console.log(this.users)
    },
    deleteRow (index, row) {
      row.splice(this.users.index, 1)
      console.log('Delete succes')
    },
    handleRowClick (row, event, column) {
      let tabForm = []

      tabForm.push(row)
      console.log('le user', tabForm)
    },
    save (users) {
      axios.post('https://swagger-178514.appspot.com/user/3?api_key=AIzaSyCdeaMmp3Eejw1Vnbv4jPwEgsa6A8womSo', {
        'id': 3,
        'idUserType': 2,
        'idCustomer': 0,
        'firstName': 'Sully',
        'lastName': 'Neret',
        'email': 'sully@cg.tv',
        'date': 'string'
      })
      console.log('ok')
    },
    formatter (row, column) {
      return row.address
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.tabForm.push(this.tout)
          // console.log(this.tabForm)
          this.post()
          .then(function (data) {
            console.log(data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getAddressData: function (addressData, placeResultData) {
      this.address = addressData
    },
    onFocus () {
      this.geolocate()
      this.$emit('focus')
    },
    /**
     * When the input loses focus
     */
    onBlur () {
      this.$emit('blur')
    },
    /**
     * When the input got changed
     */
    onChange () {
      this.$emit('change', this.autocompleteText)
    },
    /**
     * When a key gets pressed
     * @param  {Event} event A keypress event
     */
    onKeyPress (event) {
      this.$emit('keypress', event)
    },
    /**
     * Clear the input
     */
    clear () {
      this.autocompleteText = ''
    },
    /**
     * Focus the input
     */
    focus () {
      this.$refs.autocomplete.focus()
    },
    /**
     * Blur the input
     */
    blur () {
      this.$refs.autocomplete.blur()
    },
    /**
     * Update the value of the input
     * @param  {String} value
     */
    update (value) {
      this.autocompleteText = value
    }
  },
  computed: {
    list: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    autocompleteText: function (newVal, oldVal) {
      this.$emit('inputChange', { newVal, oldVal })
    }
  },
  mounted: function () {
    const options = {}
    if (this.types) {
      options.types = [this.types]
    }
    if (this.country) {
      options.componentRestrictions = {
        country: this.country
      }
    }
  }
}
</script>
<style lang="css">
  row{
    margin-top: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
