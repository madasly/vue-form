<template>
  <data-tables :data="users" :action-col-def="actionColDef">
    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom"
    width="200">
    </el-table-column>
    <el-table-column
      label="Operations"
            width="200">
      <template scope="scope">
          <el-button
            :default="true" type="warning"
            icon="delete"
            @click.native.prevent="deleteRow(scope.$index, users)"
            size="small">
            Remove
          </el-button>
          <el-button
            :default="true" type="info"
            icon="edit"
            @click.native.prevent="deleteRow(scope.$index, users)"
            size="small">
            Edit
          </el-button>
        </template>
    </el-table-column>
  </data-tables>
</template>
<script>
const url = 'https://cgprodbapi.appspot.com/users?key=AIzaSyC8qfGpiE72jAo-FFz5zYMRhVTB5m1BZms'
import axios from 'axios'
export default {
  methods: {
    deleteRow (index, row) {
      console.log(this.user)
      row.splice(index, 1)
      console.log('Delete succes')
    },
    edit () {
    },
    getUser () {
      axios.get(url)
        .then(response => {
          this.users = response.data
        })
    }
  },
  created: function () {
    this.getUser()
    console.log(this.users)
  },
  data () {
    return {
      users: [],
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
      }]
    }
  }
}
</script>
