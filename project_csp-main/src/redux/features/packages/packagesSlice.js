import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import auth from '../../services/authService'
import axios, { axiosPrivate } from '../../../axios/axios'

const state = {
    packages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',

}





    export const showPackages = createAsyncThunk('/show-Packages', async (_, thunkAPI) => {
        // console.log(userData)
        try {
            const response=await axios.get('/api/showPackages/')
            // console.log(response)
            return response.data
            
        } catch (error) {
            const message = error.response?.data?.error || error.message || error.toString()
           
            return thunkAPI.rejectWithValue(message)
        }

    })


    
    export const attributeList = createAsyncThunk('/attribute-list', async (_, thunkAPI) => {
      
        try {
            const response=await axiosPrivate.get('/api/showAttributes/')
            console.log(response)
            return response.data
            
        } catch (error) {
            const message = error.response?.data?.error || error.message || error.toString()
           
            return thunkAPI.rejectWithValue(message)
        }



    })





    export const cspDashboard = createAsyncThunk('/cspDashboard', async (userData, thunkAPI) => {
        console.log(userData)
        try {
            const response=await axiosPrivate.post('/api/packageAdd/',userData)
            console.log(response)
            return response.data
            
        } catch (error) {
            const message = error.response?.data?.error || error.message || error.toString()
           
            return thunkAPI.rejectWithValue(message)
        }

    })





   export  const packagesSlice = createSlice({
        name: 'packages',
        initialState: state,
        reducers: {
            reset:(state,action)=>{
                state.isSuccess = false
                state.isLoading = false
                state.isError = false
            }

        },
        extraReducers: (builder) => {
            builder.addCase(showPackages.pending, (state) => {
                    state.isLoading = true

                }).addCase(showPackages.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.message=''
                    state.packages = action.payload
                }).addCase(showPackages.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess=false
                    state.isError = true
                    state.message = action.payload
                    state.packages = null
                })



                .addCase(cspDashboard.pending, (state) => {
                    state.isLoading = true

                }).addCase(cspDashboard.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.message=action.payload.message
                    state.packages = action.payload
                }).addCase(cspDashboard.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess=false
                    state.isError = true
                    state.message = action.payload
                    state.packages = null
                })



                .addCase(attributeList.pending, (state) => {
                    state.isLoading = true

                }).addCase(attributeList.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.packages = action.payload
                }).addCase(attributeList.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    state.packages = []
                })
                

                

        }
    })


    export default packagesSlice.reducer
    export const {reset}= packagesSlice.actions

