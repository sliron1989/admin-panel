<template>
	<div>
		<table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Kind</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in items" :key="item._id">
				<td>
					<router-link :to="{name: 'editStorage', params: {storageId: item._id}}">{{item.name}}
					</router-link>
				</td>
				<td>{{item.kind}}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
  import { Vue, Component } from 'vue-property-decorator'
  import { createNamespacedHelpers } from 'vuex'
  import { ASSETS_MODULE_NAME, ASSETS_ACTIONS, ASSETS_STATE } from '../../store/assets/consts'

  const { mapActions, mapState } = createNamespacedHelpers(ASSETS_MODULE_NAME)

  @Component({
    methods: mapActions({ fetch: ASSETS_ACTIONS.FETCH_STORAGE_LIST }),
    computed: mapState({ items: ASSETS_STATE.STORAGE_LIST })
  })
  export default class AssetsStorageList extends Vue {
    items

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
