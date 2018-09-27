<template>
    <div>
        <h2>List of Thingamabobs : </h2>
        <ul v-if="thingamabobs && thingamabobs.length > 0"
            class="ugly-list">
            <li v-for="(thingamabob, ind) of thingamabobs"
                :key="ind">
                {{thingamabob.awesome_field}}
                <button
                    @click="handleDelete"
                    :i="ind"
                    :id="thingamabob._id" 
                    type="button">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import thingamabobAPI from './mixins/thingamabobAPI'
export default {
    name : 'Thinggies',
    data : function () {
        return {
            thingamabobs : [] // filled by requests in thingamabobAPI
        }
    },
    created : function () {
        // comes from thingamabobAPI
        this.fetchThinggies()
    },
    methods : {
        handleDelete : function (e) {
            console.log('handleDelete ', e.currentTarget)
            this.$emit('handleDelete', e.currentTarget.getAttribute('id'), e.currentTarget.getAttribute('i'))
        }
    },
    mixins : [thingamabobAPI],
    props : ['thinggyMsg'],
    watch : {
        'thinggyMsg': function () {
            console.log('thinggyMsg watch triggered')
            const thinggyMsg = this.thinggyMsg
            if (thinggyMsg && thinggyMsg.hasOwnProperty('awesome_field')) {
                this.thingamabobs.push(thinggyMsg)
            } else if (thinggyMsg && thinggyMsg.hasOwnProperty('_id')) {
                this.thingamabobs.splice(thinggyMsg.index, 1)
            }
        }
    }
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
