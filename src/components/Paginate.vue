<template>
    <ul class="pagination" v-if="value.lastPage > 1">
        <li class="page-item" @click="changePage(1)"><a href="javascript:;" class="page-link">‹‹</a></li>
        <li class="page-item" @click="prevPage()"><a href="javascript:;" class="page-link">‹</a></li>
        <li v-for="page in getPages()" @click="changePage(page.key)" :class="page.class" :key="page.key"><a
                class="page-link" href="javascript:;" v-text="page.key"></a></li>
        <li class="page-item" @click="nextPage()"><a class="page-link" href="javascript:;">›</a></li>
        <li class="page-item" @click="changePage(value.lastPage)"><a class="page-link" href="javascript:;">››</a></li>
    </ul>
</template>

<script>

export default {
    props: ['value', 'pagechange'],
    name: "Paginate",
    methods: {
        created: function () {
            this.pages = this.getPages();
        },
        getPages: function () {
            var $lastPage = this.value.lastPage;
            var $linkLimit = 7;
            var $currentPage = this.value.currentPage;

            var $halfTotalLinks = Math.floor($linkLimit / 2);
            var $from = $currentPage - $halfTotalLinks;
            var $to = $currentPage + $halfTotalLinks;
            if ($currentPage < $halfTotalLinks) {
                $to += $halfTotalLinks - $currentPage;
            }
            if ($lastPage - $currentPage < $halfTotalLinks) {
                $from -= $halfTotalLinks - ($lastPage - $currentPage) - 1;
            }
            var pages = [];

            for (var $i = 1; $i <= $lastPage; $i++) {
                if ($from < $i && $i < $to) {
                    var item = {
                        key: $i,
                        class: 'page-item'
                    };
                    if ($i === $currentPage) {
                        item = {
                            key: $i,
                            class: 'page-item active'
                        };
                    }
                    pages.push(item);
                }
            }

            return pages;
        },
        prevPage: function () {
            if (this.value.currentPage > 1) {
                this.value.currentPage--;
            }
            this.pagechange(this.value.currentPage);
        },
        nextPage: function () {

            if (this.value.currentPage < this.value.lastPage) {
                this.value.currentPage++;
            }
            this.pagechange(this.value.currentPage);
        },
        changePage: function (page) {
            this.value.currentPage = page;
            this.pagechange(page);
        }
    },

    data: function () {
        return {
            currentPage: this.value.currentPage,
            lastPage: this.value.lastPage
        }
    }
}
</script>

<style scoped>
</style>
