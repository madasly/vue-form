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
                <el-radio label="M" value="M" name="M"></el-radio>
                <el-radio label="Madame" value="Madame" name="Madame"></el-radio>
                <el-radio label="Monsieur" value="Monsieur" name="Monsieur"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre nom" v-model="ruleForm.nom" prop="firstname">
              <el-input v-model="tout.firstname" current-change="ruleForm.nom"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre prénom" prop="lastname">
              <el-input v-model="tout.lastname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
              <el-form-item label="Votre date de naissance" required>
              <el-form-item prop="Birthdaydate">
                <el-date-picker type="date" placeholder="date de naissance" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre email" type="email" prop="email">
              <el-input v-model="tout.email" placeholder="Entrez votre email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <el-form-item label="Votre téléphone" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="Entrez votre numéro">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="Vous êtes un " prop="persona">
              <el-radio-group v-model="ruleForm.persona">
                <el-radio label="User"></el-radio>
                <el-radio label="Coach"></el-radio>
                <el-radio label="Admin"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
          <el-col id="second col":span="12">
          <el-row type="text"
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
            <el-form-item><el-input placeholder="Ton numéro de rue" v-model="address.street_number"></el-input></el-form-item>
              <el-form-item><el-input placeholder="Ta rue" v-model="address.route"></el-input></el-form-item>
          <el-form-item><el-input placeholder="Ton code postal" v-model="address.postal_code"></el-input></el-form-item>
            <el-form-item><el-input placeholder="Ta ville" v-model="address.locality"></el-input>
              </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="Votre portable" prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="Entrez votre numéro">
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
   </el-tabs>
</div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  components: { VueGoogleAutocomplete },
  data () {
    return {
      imageUrl: '',
      users: [],
      autocompleteText: '',
      autocomplete: null,
      address: '',
      tout: {
        firstname: '',
        lastname: '',
        email: ''
      },
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
      }
    }
  },
  methods: {
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
<style lang="scss" scoped>
// Error: Source sample is missing.
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
