<template lang="pug"></template>

<script>
export default {
    name: "simpleCourseElement",
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        getAllData() {
            var allData = {
                type: getType(),
                data: () => {
                    var dataList = [];
                    for (component in components) {
                        dataList.push(component.getAllData());
                    }
                    return dataList;
                }
            };
            return allData;
        }
    },
    computed: {
        elements() {
            return this.data.elements || [];
        },
        type() {
            return this.data.type;
        },
        ownData() {
            return this.data;
        },
        isEditMode(){
            return this.$store.getters.isEditMode;
        }
    }
}
</script>

<style lang="less"></style>
