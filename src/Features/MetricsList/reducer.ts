import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsItem = {
  at: Number;
  metric: String;
  value: Number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState: MetricsItem[] = [];

const slice = createSlice({
  name: 'metriclist',
  initialState,
  reducers: {
    metricsListDataReceived: (state, action: PayloadAction<MetricsItem[]>) => {
      state = action.payload;
      return state;
    },
    metricsListApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
