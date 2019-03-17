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
        getType() {
            return name;
        },
        getComponents() {
            console.log("No sub components for simpleCourseElement");
            return [];
        },
        getData() {
            var allData = {
                type: getType(),
                data: () => {
                    var dataList = [];
                    for (component in getComponents()) {
                        dataList.push(component.getData());
                    }
                    return dataList;
                }
            };
            return allData;
        }
    }
}
</script>

<style lang="less"></style>
