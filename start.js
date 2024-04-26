const { spawn } = require('child_process');

const subgraphServices = ['product', 'review'];
const supergraphService = 'supergraph';

const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    proc.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    proc.on('error', (error) => {
      reject(new Error(`${command} failed with error ${error.message}`));
    });

    resolve(proc);
  });
};

const runSubgraphs = () => {
  const promises = subgraphServices.map(service => {
    console.log(`Starting ${service} subgraph...`);
    return runCommand('./node_modules/.bin/nodemon', [`${service}_subgraph/index.js`]);
  });

  return Promise.all(promises);
};

const runSupergraph = async () => {
  console.log(`Starting ${supergraphService}...`);
  await runCommand('./node_modules/.bin/nodemon', [`${supergraphService}/index.js`]);
};

runSubgraphs().then(runSupergraph).catch((error) => {
  console.error(error);
});