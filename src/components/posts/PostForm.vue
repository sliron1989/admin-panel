<template>
	<form class="post-form" @submit.prevent="submit">
		<FormInput title="Title" :value="post.title" @input="editedPost.title = $event.target.value"/>
		<FormInput title="Path" label="leave empty to auto-generate"
		           :value="post.path" @input="editedPost.path = $event.target.value"/>

		<FormInput title="Thumbnail"
		           :value="editedPost.thumbnail || post.thumbnail" placeholder="https://" @input="editedPost.thumbnail = $event.target.value">
			<div><img class="thumbnail-image" :src="editedPost.thumbnail || post.thumbnail"></div>
		</FormInput>

		<FormInput
				title="Public?"
				type="checkbox"
				:checked="isPublic"
				@change="editedPost.isPublic = $event.target.checked"/>
		<p>
			<label>
				Category:
				<CategorySelector :value="categoryPath" @change="editedPost.category = $event"
				                  @mounted="mountCategory"/>
			</label>
		</p>

		<FormInput title="Tags" @keypress.enter="addTag" placeholder="ADD NEW TAG">
			<ul>
				<li v-for="tag in tags" :key="tag">
					{{tag}}
					<button type="button" @click="removeTag(tag)">X</button>
				</li>
			</ul>
		</FormInput>

		<p>
			<label>
				Short:
				<gp-editor :value="post.short" @input="editedPost.short = $event"/>
			</label>
		</p>

		<p>
			<label>
				Content:
				<gp-editor v-model="content"/>
			</label>
		</p>

		<button>SAVE</button>
	</form>
</template>
<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import FormInput from '../forms/FormInput'
  import CategorySelector from '../categories/CategorySelector'

  @Component({
    components: { CategorySelector, FormInput }
  })
  export default class PostForm extends Vue {
    @Prop(Object) post

    editedPost = {
      title: null,
      authors: null,
      thumbnail: null,
      short: null,
      content: null,
      path: null,
      tags: null,
      category: null,
      isPublic: null,
    }

    mounted () {
      if (!this.post._id) {
        this.editedPost.isPublic = true
      }
    }

    get tags () {
      const editedTags = this.editedPost.tags
      const tags = this.post.tags
      return editedTags || tags || []
    }

    get content () {
      if (this.editedPost.content === null) {
        return this.post.content
      }
      return this.editedPost.content
    }

    set content (value) {
      this.editedPost.content = value
    }

    get categoryPath () {
      return this.post.category ? this.post.category.path : null
    }

    get isPublic () {
      const isBool = typeof this.editedPost.isPublic === 'boolean'
      return isBool ?
        this.editedPost.isPublic :
        this.post.isPublic
    }

    mountCategory (path) {
      if (!this.post._id) {
        this.editedPost.category = path
      }
    }

    addTag (event) {
      event.preventDefault()
      if (this.tags.includes(event.target.value)) {
        return
      }
      this.editedPost.tags = [...this.tags, event.target.value]
      event.target.value = ''
    }

    removeTag (tag) {
      this.editedPost.tags = this.tags.filter(t => t !== tag)
    }

    submit () {
      const onlyUpdated = Object.keys(this.editedPost).reduce((obj, key) => {
        const val = this.editedPost[key]
        if (val !== null) {
          obj[key] = val
        }
        return obj
      }, {})
      this.$emit('submit', onlyUpdated)
    }
  }
</script>
<style scoped>
	.thumbnail-image {
		max-width: 100px;
	}
</style>
