import { createRouter, createWebHistory } from 'vue-router'
import Notes from '../components/NotesItem.vue'
import Note from '../components/NoteItem.vue'

const routes = [
  { path: '/', component: Notes },
  { path: '/note/:id', component: Note, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes
})   
