<script>
    export default {
        data() {
            return {
                groups: [],
                keywords: null,
                loading: false,
                value: null,
                selected: [],
                params: {
                    per_page: 25,
                    current_page: 1
                }
            }
        },
        props: {
            item: {
                type: Object
            },
            eligibles: {
                type: Object
            }
        },
        mounted() {
            if (_.get(this.item, 'eligibles.data')) {
                var mappedItems = _.map(this.item.eligibles.data, item => {
                    return item.id;
                });
                this.$set(this.item, 'eligibles', mappedItems);
            }
            apiRequest.send('GET', 'customers/groups', []).then(response => {
                this.groups = response.data;
            });
        },
        methods: {
            sync() {
                var mappedItems = _.map(this.selected, item => {
                    return item.id;
                });
                this.$set(this.item, 'eligibles', mappedItems);
            },
            remove(id) {
                this.item.criteria.groups.splice(this.item.criteria.groups.indexOf(id), 1);
            },
            unselect(index) {
                this.selected.splice(index, 1);
                this.sync();
            }
        }
    }
</script>


<template>
    <div>
        <h5>Customer groups</h5>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="group in groups" :key="group.id">
                    <td>
                        <label>
                            <input type="checkbox" v-model="item.eligibles" :value="group.id">
                            {{ group.name }}
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
