<template>
    <b-row class="favorite">
        <b-col cols="8" class="category">{{categoryTitle}}-{{subcategoryTitle}}</b-col>
        <b-col cols="4">
            <b-button variant="outline-danger" @click="deleteFavorite" style="width:100%">
              حذف
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props:['favorite'],
    computed:{
        categoryTitle(){
            let category = this.$store.getters.getCategoryByKey(this.favorite.category);
            if(category != undefined)
                return category.title;
            return '';
        },
        subcategoryTitle(){
            if(this.favorite.subcategory == 'all')
                return 'همه';

            let subcategory = this.$store.getters.getSubcategoryByKey(this.favorite.category, this.favorite.subcategory);
            if(subcategory != undefined)
                return subcategory.title;
            return '';
        }
    },
    methods:{
        deleteFavorite(){
            this.$emit('deleteFavorite')
        }
    }
}
</script>

<style scoped>
.favorite{
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px;
}
.category{
    padding-top:5px
}
</style>