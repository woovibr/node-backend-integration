import 'isomorphic-fetch';
import { webhookPost } from '../src/openpixApi/webhookPost';

const run = async () => {
  const payload = {
    webhook: {
      isActive: true,
      name: 'OpenPix Backend Integration',
      url: 'http://localhost:5666/webhook',
      authorization: 'BackendIntegration',
    },
  };

  const result = await webhookPost(payload);

  console.log({
    result,
  });
}

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
  }
  process.exit(0);
})();
