<template>
    <div>
        <form @submit.prevent="handleSubmit" id="test-area">
            <div class="awesome-field-input-group">
                <label for="awesome-field">Awesome Field:</label>
                <input
                    v-model="thingamabob.awesome_field"
                    id="awesome-field" 
                    type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'TestArea',
    methods: {
        handleSubmit: function() {
            this.$emit('handleSubmit')
        }
    },
    props: ['thingamabob']
}
</script>

