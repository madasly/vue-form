  <template>
<div id="">
  <el-tabs type="border-card">
  <el-tab-pane label="Formulaire">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" visible="true" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="9" :offset="4">
        <el-form-item label="Civilité" prop="civilité">
          <el-radio-group v-model="ruleForm.civilité">
            <el-radio label="M" value="M" name="M"></el-radio>
            <el-radio label="Madame" value="Madame" name="Madame"></el-radio>
            <el-radio label="Monsieur" value="Monsieur" name="Monsieur"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-form-item label="Votre nom" v-model="ruleForm.nom" prop="firstname">
          <el-input v-model="tout.firstname" current-change="ruleForm.nom"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-form-item label="Votre prénom" prop="lastname">
          <el-input v-model="tout.lastname"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
          <el-form-item label="Votre date de naissance" required>
          <el-form-item prop="Birthdaydate">
            <el-date-picker type="date" placeholder="date de naissance" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-form-item label="Votre email" type="email" prop="email">
          <el-input v-model="tout.email" placeholder="Entrez votre email"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-form-item label="Votre téléphone" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="Entrez votre numéro">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-form-item label="Votre portable" prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="Entrez votre numéro">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7" :offset="4">
        <el-form-item label="Vous êtes un " prop="persona">
          <el-radio-group v-model="ruleForm.persona">
            <el-radio label="User"></el-radio>
            <el-radio label="Coach"></el-radio>
            <el-radio label="Admin"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="v-model="ruleForm.address">
      <el-col :span="8" :offset="4">
        <el-form-item label=" Votre adresse">
        <vue-google-autocomplete
    id="map"
    :country="['fr']"
    ref="address"
    v-model="autocompleteText"
    classname="form-control"
    placeholder="renseignez votre adresse"
    v-on:placechanged="getAddressData">
</vue-google-autocomplete>
    <el-input placeholder="Ton numéro de rue" v-model="address.street_number"></el-input>
      <el-input placeholder="Ta rue" v-model="address.route"></el-input>
  <el-input placeholder="Ton code postal" v-model="address.postal_code"></el-input>
    <el-input placeholder="Ta ville" v-model="address.locality"></el-input>
    </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="5">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm'), post()">Create</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </el-tab-pane>
  <el-tab-pane label="Tableau">
    <data-tables :data="users" :action-col-def="actionColDef">
      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom"
      width="150">
      </el-table-column>
      <el-table-column
        label="Operations"
              width="350">
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
              @click.native.prevent="deleteRow(scope.$index, users)"
              size="small">
              Editer
            </el-button>
            <el-button
              :default="true" type="danger"
              icon="edit"
              @click.native.prevent="deleteRow(scope.$index, users)"
              size="small">
              Modifier
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
    var url = 'https://cgprodbapi.appspot.com/users?key=AIzaSyC8qfGpiE72jAo-FFz5zYMRhVTB5m1BZms'
    this.getUser(url)
    console.log(this.users)
  },
  data () {
    return {
      titles: [{
        prop: 'email',
        label: 'Email'
      }, {
        prop: 'date',
        label: 'Date'
      }, {
        prop: 'firstName',
        label: 'Nom'
      }, {
        prop: 'lastName',
        label: 'Prénom'
      }, {
        prop: 'idUserType',
        label: 'Status'
      }, {
        prop: 'id',
        label: 'ID'
      }],
      tabform: [],
      tout: {
        firstname: '',
        lastname: '',
        email: ''
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
          trigger: 'change'
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
      },
      actionColDef: {
        label: 'Actions',
        def: [{
          handler: row => {
            this.$message('Edit clicked')
            row.flow_no = 'hello word'
          },
          name: 'Edit'
        }]
      },
      getRowActionsDef () {
        let self = this
        return [{
          type: 'primary',
          handler (row) {
            self.$message('Edit clicked')
            console.log('Edit in row clicked', row)
          },
          name: 'Edit'
        }, {
          type: 'primary',
          handler (row) {
            self.$message('RUA in row clicked')
            console.log('RUA in row clicked', row)
          },
          name: 'RUA'
        }]
      }
    }
  },

  methods: {
    getUser () {
      var url = 'https://cgprodbapi.appspot.com/users?key=AIzaSyC8qfGpiE72jAo-FFz5zYMRhVTB5m1BZms'
      axios.get(url)
        .then((response) => {
          this.users = response.data
          console.log(this.users)
        })
    },
    post () {
      var url = 'https://cgprodbapi.appspot.com/post?key=AIzaSyC8qfGpiE72jAo-FFz5zYMRhVTB5m1BZms'
      axios.post(url, {
        firstname: this.tout.firstname,
        lastname: this.tout.lastname,
        email: this.tout.email})
      console.log(this.tout)
    },
    created: function () {
      this.getUser()
      console.log(this.users)
    },
    deleteRow (index, row) {
      row.splice(index, 1)
      console.log('Delete succes')
    },
    formatter (row, column) {
      return row.address
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
        this.$emit('no-results-found', place)
        return
      }
      let addressComponents = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      }
      let returnData = {}
      if (place.address_components !== undefined) {
            // Get each component of the address from the place details
        for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0]
          if (addressComponents[addressType]) {
            let val = place.address_components[i][addressComponents[addressType]]
            returnData[addressType] = val
          }
        }
        returnData['latitude'] = place.geometry.location.lat()
        returnData['longitude'] = place.geometry.location.lng()
            // return returnData object and PlaceResult object
        this.$emit('placechanged', returnData, place, this.id)
      }
    })
  }
}
</script>
<style lang="css">
  row{
    margin-top: 20px;
  }
</style>
