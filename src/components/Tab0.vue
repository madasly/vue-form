<template>
<el-table :data="users" border style="width: 100%" max-height="250">
  <el-table-column fixed prop="date" label="Date" width="150">
  </el-table-column>
  <el-table-column prop="name" label="Name" width="120">
  </el-table-column>
  <el-table-column prop="state" label="State" width="120">
  </el-table-column>
  <el-table-column prop="city"  sortable label="City" width="120">
  </el-table-column>
  <el-table-column prop="address" label="Address" width="300">
  </el-table-column>
  <el-table-column prop="zip" label="Zip" width="120">
  </el-table-column>
  <el-table-column fixed="right"  label="Operations" width="120">
    <template scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, users)"
          type="text"
          size="small">
          Remove
        </el-button>
      </template>
  </el-table-column>
</el-table>
</template>
<script>
export default {
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    }
  },
  data () {
    return {
      tableData4: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }]
    }
  }
}
</script>
