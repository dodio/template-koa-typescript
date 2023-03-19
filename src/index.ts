import Koa from 'koa'

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'Hello World!'
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000')
})
