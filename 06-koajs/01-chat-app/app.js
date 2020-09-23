const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const clients = [];

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise(resolve => {
    clients.push(resolve);
    
    ctx.res.on('close', () => {
      clients.splice(clients.indexOf(resolve), 1);
      resolve('Unsubscribed');
    });
  });

  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  if (!ctx.request.body.message) {
    ctx.body = 'empty message';
    return;
  }
  
  clients.forEach(client => client(ctx.request.body.message));
  clients.length = 0;
  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
