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
        <h2>List of Dohickies : </h2>
        <ul v-if="dohickies && dohickies.length > 0"
            class="ugly-list">
            <li v-for="(dohicky, ind) of dohickies"
                :key="ind">
                <span v-if="!dohicky.is_ok" class="warning">!!!</span>
                <p v-html="(dohicky.thingamabob_id && dohicky.thingamabob_id.hasOwnProperty('awesome_field') ?
                    `Dohicky linked to ${dohicky.thingamabob_id.awesome_field}` :
                    `Dohicky linked to deleted ${dohicky.thingamabob_bp.awesome_field}`)"></p>
            </li>
        </ul>
    </div>
</template>

<script>
import dohickyAPI from './mixins/dohickyAPI'
import thingamabobAPI from './mixins/thingamabobAPI'
export default {
    name : 'Thinggies',
    data : function () {
        return {
            dohickies : [], // filled by requests in dohickyAPI
            thingamabobs : [] // filled by requests in thingamabobAPI
        }
    },
    created : function () {
        // comes from thingamabobAPI
        this.fetchThinggies()
        // comes from dohickyAPI
        this.fetchDohickies()
    },
    methods : {
        handleDelete : function (e) {
            this.$emit('handleDelete', e.currentTarget.getAttribute('id'), e.currentTarget.getAttribute('i'))
        }
    },
    mixins : [dohickyAPI, thingamabobAPI],
    props : ['dohickyMsg', 'thinggyMsg', 'uDoh'],
    watch : {
        'dohickyMsg': function () {
            const dohickyMsg = this.dohickyMsg
            if (dohickyMsg) {
                this.dohickies.push(dohickyMsg)
            }
        },
        'thinggyMsg': function () {
            const thinggyMsg = this.thinggyMsg
            if (thinggyMsg && thinggyMsg.hasOwnProperty('awesome_field')) {
                this.thingamabobs.push(thinggyMsg)
            } else if (thinggyMsg && thinggyMsg.hasOwnProperty('_id')) {
                this.thingamabobs.splice(thinggyMsg.index, 1)
            }
        },
        'uDoh': function () {
            const uDoh = this.uDoh
            for (let dohicky of this.dohickies) {
                if (dohicky._id === uDoh._id) {
                    dohicky.is_ok = uDoh.is_ok
                }
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

    .ugly-list li>p {
        display: inline;
    }

    .warning {
        color : #f00;
        display: inline-block;
    }
</style>
