<template>
	<div>
		<table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Public</th>
				<th>Path</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="category in categories" :key="category._id">
				<td>
					<router-link :to="{name: 'editCategory', params: {categoryId: category._id}}">{{category.name}}
					</router-link>
				</td>
				<td>{{category.isPublic ? 'V' : 'X'}}</td>
				<td>{{category.path}}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
  import { Vue, Component } from 'vue-property-decorator'
  import { createNamespacedHelpers } from 'vuex'
  import { CATEGORIES_MODULE_NAME, CATEGORIES_ACTIONS, CATEGORIES_STATE } from '../../store/categories/consts'

  const { mapActions, mapState } = createNamespacedHelpers(CATEGORIES_MODULE_NAME)

  @Component({
    methods: mapActions({ fetch: CATEGORIES_ACTIONS.FETCH_CATEGORIES }),
    computed: mapState({ categories: CATEGORIES_STATE.CATEGORIES })
  })
  export default class CategoriesList extends Vue {
    created () {
      this.fetch()
    }
  }
</script>
<style scoped lang="scss">
	table {
		width: 100%;
	}
	tr, td {
		text-align: center;
		border: 1px solid #eee;
	}
</style>
