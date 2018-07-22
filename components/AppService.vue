<template lang="pug">
  .AppService
    .AppService_Inner
      app-heading.AppService_title サービス
      el-row(:gutter="30")
        el-col(v-for="(g, key) in gridData" :key="key" :span="8")
          .AppService_Grid
            .AppService_ServiceContent
              .AppService_ServiceTitle
                el-tooltip(placement="top")
                  div(slot="content") {{ g.price }}
                  app-heading(:level="3") {{ g.name }}
              .AppService_ServiceDes {{ g.des }}
              .AppService_ButtonContainer
                el-button.AppService_Button(type="primary" @click="dialogTableVisible = true") 詳しく見る
    el-dialog.AppService_Dialog(:visible.sync="dialogTableVisible" :title="dialogTitle")
      el-table(:data="gridData")
        el-table-column(property="name" label="サービス名" width="200")
        el-table-column(property="price" label="料金" width="200")
        el-table-column(property="deliveryDate" label="納期")
</template>

<script>
import AppHeading from './AppHeading'
export default {
  components: { AppHeading },
  data() {
    return {
      dialogTitle: 'サービス料金表',
      dialogTableVisible: false,
      gridData: [
        {
          name: 'HP作成',
          price: '50万円~',
          deliveryDate: '1ヶ月',
          des:
            'サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細'
        },
        {
          name: 'Vue.jsサイト構築',
          price: '100万円~',
          deliveryDate: '1ヶ月',
          des:
            'サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細'
        },
        {
          name: 'React.jsサイト構築',
          price: '100万円~',
          deliveryDate: '1ヶ月',
          des:
            'サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細サービスの詳細'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.AppService {
  border-bottom: 1px solid #eaeaea;
  &_Inner {
    width: 1140px;
    padding: 60px 30px;
    margin: 0 auto;
  }
  &_Title {
  }
  &_ServiceTitle {
    h3 {
      margin: 0 0 15px;
      text-align: center;
    }
  }
  &_ServiceDes {
    margin: 0 0 15px;
  }
  &_ButtonContainer {
    margin: 0;
    text-align: center;
  }
}
</style>
