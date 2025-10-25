<template>
  <div :class="[
    'p-4 rounded-lg shadow-md transform transition',
    note.color || 'bg-yellow-200',
    'hover:rotate-0 rotate-1'
  ]">
    <h3 class="font-bold text-lg mb-2 break-words">{{ note.title }}</h3>
    <p class="text-gray-700 whitespace-pre-wrap break-words">{{ note.content }}</p>

    <div class="flex justify-end gap-2 mt-4">
      <!-- Bouton Modifier -->
      <button @click="$emit('edit', note)" class="text-blue-600 hover:text-blue-800" title="Modifier">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      </button>

      <!-- Bouton Supprimer -->
      <button @click="$emit('delete', note)" class="text-red-600 hover:text-red-800" title="Supprimer">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ note: { type: Object, required: true } })
</script>