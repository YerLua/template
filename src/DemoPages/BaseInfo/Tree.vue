<template>
    <Treeselect v-model="value" :disable-branch-nodes="true" :options="options" ></Treeselect>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name:'Tree',
    components: {
        Treeselect
    },
    data: ()=>({
        value: null,
        options: [ {
            id: '1',
            label: '浙江省',
            children: [{
                id: '11',
                label: '杭州市',
                children:[
                {
                    id:'111',
                    label:'交通厅'
                },
                {
                    id:'112',
                    label:'科技厅'
                },
                {
                    id:'113',
                    label:'钢铁研究所'
                }
                ]
            },
            {
                id:'12',
                label:'宁波市'
            },
            {
                id:'13',
                label:'温州市'
            }]
        }]
    })
}
</script>