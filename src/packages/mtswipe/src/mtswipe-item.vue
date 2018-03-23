<template>
  <div class="zfb-mtswipe-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zfb-mtswipe-item',

    mounted () {
      this.$parent && this.$parent.swipeItemCreated(this);
    },

    destroyed () {
      this.$parent && this.$parent.swipeItemDestroyed(this);
    }
  };
</script>
