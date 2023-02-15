const rp = require('request-promise')
const openai_apikey = require('./config').openai_apikey

const callCompletions = async (prompt) => {
    let postBody = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1024
    }
    var options = {
        method: 'POST',
        uri: `https://api.openai.com/v1/completions`,
        headers: {
            'Authorization': `Bearer ${openai_apikey}`
        },
        body: postBody,
        json: true // Automatically stringifies the body to JSON
    };

    return await rp(options)
        .then((res) => {
            const ret_text = res.choices[0].text
            const usage = res.usage.total_tokens
            return {
                ret_text,
                usage
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = callCompletions