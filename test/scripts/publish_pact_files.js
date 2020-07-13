const pact = require('@pact-foundation/pact-node');
const path = require('path');

const branch = process.env.CI_COMMIT_BRANCH;
const commitSHA = process.env.CI_COMMIT_SHA;

console.info("📝 Publishing pact files")
console.info(`🌿 Branch: ${branch}`)
console.info(`🏷️  ReleaseID: ${commitSHA}`)

pact
  .publishPacts({
    pactBroker: 'https://pact-broker.eu-west-1.dev.onfido.xyz/',
    pactFilesOrDirs: [path.resolve(__dirname, '../pacts')],
    consumerVersion: commitSHA,
    tags: [branch],
  })
  .then(() => {
    console.info('Pact files published successfully!');
  })
  .catch(error => {
    console.error('Pact files failed to upload: ', error.message);
  });
