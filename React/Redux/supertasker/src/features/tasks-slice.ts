import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = { enterties: []} // 这个形式并不是很好
export type TaskState = {
  entities: Task[];
}

const initialState: TaskState = {
  entities: []
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) =>{
      state.entities.push(action.payload)
    },
    removeTask: (state) => state,
  }
})
