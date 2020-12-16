<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"/>
      </div>

      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>

    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';


const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
// const version = window.localStorage.getItem(('version') || '0')
// if (version === '0.0.1'){
//   recordList.forEach(record =>{
//     record.createdAt = new Date(2020,0,1);
//   })
//   window.localStorage.setItem('recordList',JSON.stringify(recordList));
// }
// window.localStorage.setItem('version','0.0.2');


@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>