const axios = require('axios');
require('dotenv').config();

//  credentials from Oxford API dashboard
app_id = process.env.appId
app_key = process.env.appKey

// getting details of words
const getWordDetail = async (word) => {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', app_id, app_key },
        url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=definitions,etymologies,examples&strictMatch=false`
    }

    //definig an empty object
    let wordObj = {}

    //error handling
    try {
        let { data } = await axios(options)

        //  adding required fields to word object
        wordObj.word = data.word
        wordObj.entries = []
        data.results[0].lexicalEntries.forEach(entry => {
            wordObj.entries.push({
                partOfSpeech: entry.lexicalCategory.text,
                origin: entry.entries[0].etymologies,
                definitions: entry.entries[0].senses[0].definitions,
                examples: entry.entries[0].senses[0].examples.map(example => example.text)
            })
        })

        // returning word object
        return wordObj
    } catch (e) {
        return false
    }
}

module.exports = getWordDetail;