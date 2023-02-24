const express = require('express')
const app = express()

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
});

app.get('/bb_data', async (_req, res) => {
    const url = "https://belarusbank.by/api/kursExchange"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Something went wrong! Status: ${response.status}`)
        }

        const result = await response.json()
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'An error occured!'})
    }
});

const port = 7000

app.listen(port, () => console.log(`Server is listening at port ${port}`))
