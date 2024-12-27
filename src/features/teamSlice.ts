import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TeamMember {
  imgUrl: string | undefined;
  id: number;
  name: string;
  role: string;
  photo: string;
}

interface TeamState {
  members: TeamMember[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TeamState = {
  members: [],
  status: "idle",
};

export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  const response = await axios.get("https://cb91213a01996430.mokky.dev/team");
  return response.data;
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(fetchTeam.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default teamSlice.reducer;