import React, { FC } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Chip,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    getMetrics
  }
`;

const useStyles = makeStyles({
  selectBox: {
    minWidth: 300,
    height: 50,
    float: 'right',
    margin: 30,
  },
});

type MetricDataResponse = {
  getMetrics: string[];
};

const Metrics: FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery<MetricDataResponse>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metric data not found" />;

  const { getMetrics } = data;

  return (
    <FormControl className={classes.selectBox}>
      <InputLabel>Select Metrics:</InputLabel>
      <Select
        multiple
        value={[]}
        input={<Input />}
      >
        {getMetrics.map(metric => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Metrics />
  </ApolloProvider>
);
