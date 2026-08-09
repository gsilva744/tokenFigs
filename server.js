import express from 'express';
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 3000

const app = express();

import router from './routers/router.js'

app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`API rodando na porta: ${PORT}`)
})