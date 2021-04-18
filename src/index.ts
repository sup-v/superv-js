import { metricRequest } from './api';

type Options = {
  apiKey: string;
};

export type Item = {
  name: string;
  counter?: number;
  value?: number;
  tags?: string[];
};

export function init(options: Options) {
  const apiKey = options.apiKey ?? null;
  const tmp: {
    queue: Item[];
  } = {
    queue: [],
  };

  return {
    count(name: string, counter?: number, tags?: string[]) {
      tmp.queue.push({
        name,
        counter,
        tags,
      });
    },

    value(name: string, value?: number, tags?: string[]) {
      tmp.queue.push({
        name,
        value,
        tags,
      });
    },

    getPending() {
      return tmp.queue;
    },

    send() {
      const queue = [...tmp.queue];
      tmp.queue = [];
      return metricRequest(queue, apiKey);
    },
  };
}
