<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6>Authors table</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Function</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Employed</th>
                            <th class="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="entry in entries" :key="entry.id">
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-sm">John Michael</h6>
                                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                                    </div>
                                </div>
                            </td>
                            <td v-text="entry.name">
                            </td>
                            <td class="align-middle text-center " v-text="entry.name">
                            </td>
                            <td class="align-middle text-center" v-text="entry.name">
                            </td>
                            <td class="">
                                <a :href="'/xadmin/customers/edit?id=' + entry.id" class="btn "><i
                                        class="fa fa-edit"></i></a>
                                <!-- <a href="javascript:;" class="btn "><i class="fa fa-trash"></i></a> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top:10px; ">
                    <Paginate :value="paginate" :pagechange="onPageChange"></Paginate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "management-customer",
    components: {},
    data() {
        return {
            entries: [{
                name: 'aa',
                email: 'aa',

            }],
            paginate: {
                currentPage: 1,
                lastPage: 1
            }
        }
    },
    mounted() {
    },
    methods: {
        onPageChange() {
        }
    }
}
</script>

<style scoped lang="scss">
</style>
