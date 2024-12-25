<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="p-4 border-b flex justify-between items-center">
        <h1 class="text-xl font-semibold">
          My Notes
        </h1>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <XIcon class="h-5 w-5" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex border-b px-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="currentTab = tab"
          :class="[
            'px-4 py-2 font-medium',
            currentTab === tab
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Add Note -->
      <div class="p-4 bg-yellow-50">
        <div class="flex items-center gap-2">
          <input
            v-model="newNote"
            type="text"
            placeholder="Add note..."
            class="w-full bg-transparent outline-none placeholder-gray-500"
            @keyup.enter="addNote"
          />
          <PenIcon class="h-4 w-4 text-gray-400" />
        </div>
        <div class="text-xs text-gray-500 mt-1">
          TODAY
        </div>
      </div>

      <!-- Notes List -->
      <div class="p-4 space-y-3">
        <TransitionGroup name="note">
          <div
            v-for="note in filteredNotes"
            :key="note.id"
            :class="[
              'p-4 rounded-lg relative group transition-all duration-200',
              noteColors[note.color],
            ]"
          >
            <div class="flex items-start justify-between gap-2">
              <span :class="{ 'line-through': note.completed }">{{
                note.text
              }}</span>
              <div
                class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  @click="toggleNote(note.id)"
                  class="p-1 hover:bg-white/20 rounded"
                >
                  <CheckIcon class="h-4 w-4" />
                </button>
                <button
                  @click="deleteNote(note.id)"
                  class="p-1 hover:bg-white/20 rounded"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="text-xs mt-2 opacity-70">
              {{ formatDate(note.date) }}
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Note {
  id: number;
  text: string;
  date: Date;
  completed: boolean;
  color: "blue" | "purple" | "green" | "yellow";
}

const tabs = ["All", "Notes", "Pinned"];
const currentTab = ref("All");
const newNote = ref("");

const notes = ref<Note[]>([
  {
    id: 1,
    text: `'Conduct routine inspections of the building's structure, systems, and facilities to identify and address potential maintenance issues before they become major problems.'`,
    date: new Date("2024-01-11"),
    completed: false,
    color: "blue",
  },
  {
    id: 2,
    text: "Develop and regularly review emergency response plans for the building.",
    date: new Date("2024-01-08"),
    completed: false,
    color: "purple",
  },
  {
    id: 3,
    text: ` 'Regular cleaning and inspections help prevent deterioration and maintain the building's overall aesthetics.'`,
    date: new Date("2024-01-05"),
    completed: false,
    color: "green",
  },
]);

const noteColors = {
  blue: "bg-blue-100",
  purple: "bg-purple-100",
  green: "bg-green-100",
  yellow: "bg-yellow-100",
};

const filteredNotes = computed(() => {
  return notes.value;
});

const addNote = () => {
  if (newNote.value.trim()) {
    const colors: Array<"blue" | "purple" | "green" | "yellow"> = [
      "blue",
      "purple",
      "green",
      "yellow",
    ];
    notes.value.unshift({
      id: Date.now(),
      text: newNote.value,
      date: new Date(),
      completed: false,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    newNote.value = "";
  }
};

const toggleNote = (id: number) => {
  const note = notes.value.find((n) => n.id === id);
  if (note) {
    note.completed = !note.completed;
  }
};

const deleteNote = (id: number) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
};
</script>

<style scoped>
.note-enter-active,
.note-leave-active {
  transition: all 0.3s ease;
}

.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.note-move {
  transition: transform 0.3s ease;
}
</style>
