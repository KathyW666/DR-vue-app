<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item label="按时间筛选:">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
          >
            筛选
          </el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            v-if="user.identity == 'manager'"
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="40">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          align="center"
          width="253"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="72">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="72">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="90">
          <template slot-scope="scope">
            <span style="color:#4db3ff"> {{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="140">
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作"
          fixd="right"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              v-if="user.identity == 'manager'"
              size="mini"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              v-else
              size="mini"
              type="warning"
              icon="edit"
              plain
              disabled
              >编辑</el-button
            >
            <el-button
              v-if="user.identity == 'manager'"
              size="mini"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button v-else size="mini" icon="delete" type="danger" disabled
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页模块 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹框页面 -->
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundlist",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      search_data: {
        startTime: "",
        endTime: ""
      },
      paginations: {
        page_index: 1, //当前页面索引，默认第一页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条, 默认5条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles")
        .then(res => {
          // console.log(res);
          // this.tableData = res.data;
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    handleEdit(index, row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页显示数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 初始化分页默认属性
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 每个分页中的数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSearch() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      if (
        this.search_data.startTime.getTime() >
        this.search_data.endTime.getTime()
      ) {
        this.$message({
          type: "warning",
          message: "时光不能倒流"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      // console.log(this.search_data.startTime instanceof Date); // true
      // 返回的是一个Date对象
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      this.setPaginations();
    }
  },
  components: {
    Dialog
  }
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
