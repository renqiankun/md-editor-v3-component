<template>
  <div class="table-wrap">
    <ElTable :data="tableData" border stripe>
      <ElTableColumn prop="date" label="日期" width="180"></ElTableColumn>
      <ElTableColumn prop="name" label="姓名" width="180"></ElTableColumn>
      <ElTableColumn prop="address" label="地址">
        <template #default="{ $index }">
          <ElButton type="danger" text @click="deleHand($index)">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { ref, watch } from 'vue';
const props = withDefaults(
  defineProps<{
    data: any[];
    _isComplete?: boolean;
  }>(),
  {
    data: () => []
  }
);

const tableData = ref<Array<any>>([]);
watch(
  () => [props._isComplete, props.data],
  (newVal) => {
    const [newIsComplete] = newVal;
    if (newIsComplete) {
      tableData.value = props.data ?? [];
    }
  },
  {
    immediate: true
  }
);

/**
 * 删除
 * @param index
 */
const deleHand = (index: number) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      tableData.value.splice(index, 1);
    })
    .catch(() => {
      // do nothing
    });
};
</script>

<style lang="scss" scoped>
.table-wrap {
  box-sizing: border-box;
}
</style>
