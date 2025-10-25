import { defineStore } from 'pinia'

const API_URL = 'https://post-it.epi-bluelock.bj/notes'

const COLORS = [
  'bg-yellow-200',
  'bg-green-200',
  'bg-pink-200',
  'bg-blue-200',
  'bg-purple-200',
  'bg-orange-200',
]

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    page: 1,
    limit: 6,
    total: 0,
  }),
  actions: {
    async fetchNotes(page = this.page, limit = this.limit) {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Erreur GET notes')

        const data = await res.json()
        console.log('Notes récupérées:', data)

        const notesArray = data.notes || data || []

        this.notes = notesArray.map((n, i) => ({
          id: n._id , //  id corrigé
          title: n.title,
          content: Array.isArray(n.content) ? n.content.join('\n') : n.content || '',
          color: COLORS[i % COLORS.length],
        }))

        this.total = this.notes.length
        this.page = page
        this.limit = limit
      } catch (err) {
        console.error('Erreur fetchNotes:', err)
      }
    },

    async addNote(title, content) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            content: [content],
          }),
        })

        if (!res.ok) throw new Error('Erreur POST note')

        await res.json()
        await this.fetchNotes(this.page, this.limit)
      } catch (err) {
        console.error('Erreur addNote:', err)
      }
    },

    async updateNote(id, title, content) {
    	const r = API_URL + '/' + id;
    	console.log(r);
      try {
        const res = await fetch(r, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "title": title,
            "content": [content],
          }),
        })

        if (!res.ok) throw new Error('Erreur PUT note')

        await res.json()
        await this.fetchNotes(this.page, this.limit)
      } catch (error) {
        console.error('Erreur updateNote:', error)
      }
    },

    async deleteNote(id) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error('Erreur DELETE note')

        await res.json()
        await this.fetchNotes(this.page, this.limit)
      } catch (err) {
        console.error('Erreur deleteNote:', err)
      }
    },

    async clearNotes() {
      try {
        const deletePromises = this.notes.map((note) =>
          fetch(`${API_URL}/${note.id}`, { method: 'DELETE' }),
        )

        await Promise.all(deletePromises)
        await this.fetchNotes(this.page, this.limit)
      } catch (err) {
        console.error('Erreur clearNotes:', err)
      }
    },
  },
})
