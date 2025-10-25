<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-black text-white p-4 text-center text-2xl font-bold">
      Mes Post-it
    </header>

    <main class="max-w-5xl mx-auto p-6">
      <!-- Buttons -->
      <div class="flex justify-center gap-4 my-6">
        <button @click="openModal()"
          class="bg-indigo-600 text-white flex justify-center rounded-lg hover:bg-indigo-700 hover:scale-105 transition duration-300 md:px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-plus pl-2 mx-2">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          Nouveau post-it
        </button>

        <button @click="confirmClear"
          class="bg-red-500 flex justify-center text-white px-4 py-2 rounded-lg hover:bg-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 mr-2">
            <path
              d="M10 11v6M14 11v6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Supprimer tout
        </button>
      </div>

      <!-- Etat vide -->
      <div v-if="store.notes.length === 0" class="text-center text-gray-500 mt-12">
        <p class="mb-4">Aucun post-it pour le moment.</p>
        <p class="text-sm text-gray-400">Clique sur "Nouveau post-it" pour commencer.</p>
      </div>

      <!-- Liste des post-it paginés -->
      <transition-group name="list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
        <Note v-for="note in paginatedNotes" :key="note.id" :note="note" @edit="openModal" @delete="deleteNote" />
      </transition-group>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-6">
        <button @click="prevPage" :disabled="store.page === 1"
          class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
          ◀
        </button>
        <span>Page {{ store.page }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="store.page === totalPages"
          class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
          ▶
        </button>
      </div>

      <!-- Modal -->
      <Notes v-if="isModalOpen" :noteToEdit="noteToEdit" @close="closeModal" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotesStore } from './stores/notes'
import Note from './components/Note.vue'
import Notes from './components/Notes.vue'

const store = useNotesStore()
onMounted(() => store.fetchNotes())

const isModalOpen = ref(false)
const noteToEdit = ref(null)


function openModal(note = null) {
//console.log(note)
  noteToEdit.value = note
  isModalOpen.value = true
}
function closeModal() {
  isModalOpen.value = false
  noteToEdit.value = null
}
function confirmClear() {
  if (store.notes.length && confirm('Supprimer tous les post-it ?')) store.clearNotes()
}
function deleteNote(note) {
  if (confirm(`Supprimer le post-it "${note.title}" ?`)) store.deleteNote(note.id)
}

// Pagination front-only
const totalPages = computed(() => Math.ceil(store.total / store.limit))
const paginatedNotes = computed(() => {
  const start = (store.page - 1) * store.limit
  return store.notes.slice(start, start + store.limit)
})
console.log(paginatedNotes)
function prevPage() { if (store.page > 1) store.page-- }
function nextPage() { if (store.page < totalPages.value) store.page++ }
</script>
