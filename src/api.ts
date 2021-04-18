import fetch from 'isomorphic-unfetch';

import { Item } from './index';

export async function metricRequest(queue: Item[], apiKey: string) {
  const url =
    'production' !== process.env.NODE_ENV
      ? 'http://localhost:3000/api/v1/metric'
      : 'https://supv.cloud/api/v1/metric';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      metrics: queue,
    }),
  });

  if (!res.ok) {
    console.error('Error requesting API,', res.status, res.statusText);
  }
}
