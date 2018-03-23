<template>
    <div id='' class="m-input-autoclear">
        <!--<div class="m-list-label">-->
            <!--{{label}}-->
            <!--<i class="required" v-if="required">*</i>-->
        <!--</div>-->
        <!--<div class="m-list-val">-->
            <!--<input type="text">-->
        <!--</div>-->
        <div style="height: 0.8rem;background: skyblue;width: 100%">666</div>
    </div>
</template>
<script>
    export default {
        name: 'm_input_autoclear',
        props: {
            label: {
                type: String,
                default: '姓名'
            },
            required: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        },
        methods: {},
        computed: {}
    }
</script>
<style lang="scss">
    .m-input-autoclear {
        height: .8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
    }
    .m-list-val {
        input {
            text-align: right;
            margin-right: 20px;
        }
    }
</style>