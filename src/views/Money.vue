<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

      <div class="createdAt">
        <FormItem field-name="日期"
                  placeholder="选择一下日期吧~"
                  type="date"
                  :value.sync="record.createdAt"
        />
      </div>
      <div class="notes">
        <Icon name="note"/>
        <FormItem field-name="备注"
                  placeholder="写点备注吧~"
                  :value.sync="record.notes"
        />
      </div>
      <Tags @update:value="record.tags =$event"/>
      <Tabs :data-source="recordTypeList"
            :value.sync="record.type"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags.length || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert(('已保存'));
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
}
.icon{
  width: 30px!important;
  height: 30px!important;
  margin: 5px 13px;
  color: #000000;
}
//.notes {
//  padding: px 0;
//}
//.createdAt {
//  padding: 8px 0;
//}
</style>