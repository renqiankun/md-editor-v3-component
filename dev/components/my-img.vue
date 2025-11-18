<template>
  <div class="wrap">
    <ElImage
      :key="url"
      style="width: 100px; height: 100px"
      :src="url"
      :zoomRate="1.2"
      :maxScale="7"
      :minScale="0.2"
      :previewSrcList="[url]"
      showProgress
      :initialIndex="4"
      fit="cover"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    _isComplete?: boolean;
    _attrs: any;
  }>(),
  {}
);

let url = computed(() => {
  console.log(props._isComplete, props._attrs?.src);
  return props._isComplete ? props._attrs?.src : '';
});
</script>

<style lang="scss" scoped>
.wrap {
  box-sizing: border-box;
}
</style>
