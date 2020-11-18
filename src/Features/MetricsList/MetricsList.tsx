import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions } from './reducer';
import { Provider, createClient, useQuery, defaultExchanges, subscriptionExchange } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  //   exchanges: [
  //     ...defaultExchanges,
  //     subscriptionExchange({
  //       forwardSubscription: operation => subscriptionClient.request(operation),
  //     }),
  //   ],
});

const query = `
query($input:MeasurementQuery){
    getMeasurements(input:$input){
        at
        metric
        value
    }
}`;

const getMetricsList = (state: IState) => {
  console.log(state);
  return state.metriclist;
};

export default (props: any) => {
  const { option } = props;
  return (
    <Provider value={client}>
      <MetricsList option={option} />
    </Provider>
  );
};

const MetricsList = (props: any) => {
  const { option } = props;

  const dispatch = useDispatch();
  //   const currentTime = new Date().valueOf();

  // to do: add websocket connection

  //   const before = 1605104126265;
  const before = new Date().valueOf();
  const currentTime = before - 30 * 60 * 1000;

  const input = {
    metricName: option.toString(),
    after: currentTime,
    before: before,
  };

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });
  const metricslist = useSelector(getMetricsList);

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsListApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;
    dispatch(actions.metricsListDataReceived(getMeasurements));
  }, [dispatch, data, error]);

  //   if (fetching) return <LinearProgress />;

  const plotValues: any[] = [];
  metricslist.forEach(metricItem => {
    plotValues.push(metricItem.value);
  });
  console.log(plotValues);
  return (
    // <div>
    //   {metricslist.map((metricItem, i) => (
    //     <h1 key={i}>{metricItem.value}</h1>
    //   ))}
    // </div>
    <LineChart width={1200} height={600} data={metricslist} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="at" />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};
