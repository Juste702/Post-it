.<template>
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
    <div @click.self="close" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <!-- croix en haut à droite -->
        <button @click="close" class="absolute top-3 right-3 text-gray-500 hover:text-black"
          aria-label="close">✖</button>

        <h2 class="text-xl font-bold mb-4">
          {{ isEdit ? 'Modifier le post-it' : 'Nouveau post-it' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
          <input v-model="title" type="text" placeholder="Titre" class="border p-2 rounded" required maxlength="50" />
          <textarea v-model="content" placeholder="Contenu" class="border p-2 rounded h-32" required
            maxlength="350"></textarea>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="close"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>

            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {{ isEdit ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNotesStore } from '../stores/notes'

const props = defineProps({
  noteToEdit: { type: Object, default: null }
})
const emit = defineEmits(['close'])

const store = useNotesStore()

const title = ref('')
const content = ref('')

const isEdit = ref(false)

watch(
  () => props.noteToEdit,
  (v) => {
    if (v) {
      title.value = v.title
      content.value = v.content
      isEdit.value = true
    } else {
      title.value = ''
      content.value = ''
      isEdit.value = false
    }
  },
  { immediate: true }
)

function handleSubmit() {
  const t = title.value.trim()
  const c = content.value.trim()
  if (!t || !c) return

  if (isEdit.value && props.noteToEdit) {

    store.updateNote(props.noteToEdit.id, t, c)
  } else {
    store.addNote(t, c)
  }
  emit('close')
}

// close modal helper
function close() {
  emit('close')
}

// close on Escape
function onKey(e) {
  if (e.key === 'Escape') close()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
