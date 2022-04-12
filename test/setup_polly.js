/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

function startPolly() {
  setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: resolve(__dirname, './cassettes'),
      },
    },
    matchRequestsBy: {
      headers: false,
    },
  });
}

function stripCreds(server) {
  server.any().on('beforePersist', (_, recording) => {
    // eslint-disable-next-line no-param-reassign
    recording.request.headers = recording.request.headers.filter(
      ({ name }) => name !== 'authorization',
    );
  });
}

export { startPolly, stripCreds };