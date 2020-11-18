import { reducer as weatherReducer } from '../Features/Weather/reducer';
import {reducer as metricslistReducer} from '../Features/MetricsList/reducer';

export default {
  weather: weatherReducer,
  metriclist: metricslistReducer
};
