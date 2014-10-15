  var APIeasy = require('api-easy'),
      assert = require('assert');

  var suite = APIeasy.describe('your/awesome/api');

  suite.discuss('When using your awesome API')
      .discuss('and your awesome resource')
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get('/users/listall')
      .expect(200)
      .export(module);
  var sessions = APIeasy.describe('your/awesome/api');

  sessions.discuss('When using your awesome API')
      .discuss('and your awesome resource')
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get('/session/listall')
      .expect(200)
      .export(module);