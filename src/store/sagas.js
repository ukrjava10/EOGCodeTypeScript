import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricslistSaga from '../Features/MetricsList/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricslistSaga);
}
