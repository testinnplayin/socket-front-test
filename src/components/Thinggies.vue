<template>
    <div>
        <h2>List of Thingamabobs : </h2>
        <ul v-if="thingamabobs && thingamabobs.length > 0"
            class="ugly-list">
            <li v-for="(thingamabob, ind) of thingamabobs"
                :key="ind">{{thingamabob.awesome_field}}</li>
        </ul>
    </div>
</template>

<script>
import thingamabobAPI from './mixins/thingamabobAPI'
export default {
    name : 'Thinggies',
    data : function () {
        return {
            thingamabobs : []
        }
    },
    created : function () {
        this.fetchThinggies()
    },
    mixins : [thingamabobAPI]
}
</script>

<style>
    .ugly-list {
        display: block;
    }

    .ugly-list li {
        display: block;
        padding: 10px 0;
    }
</style>
