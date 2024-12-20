
const americanToBritishTitles = require("./american-to-british-titles.js")


class Translator {
     

    findKey(text,dictionary) {
        const words=Object.keys(dictionary);
        words.forEach(word=> {
            let regex = new RegExp(`\\b${word}\\b`,'gi')
            if (regex.test(text)) {
                text=text.replaceAll(regex,()=>{
                    const newWord=dictionary[word];
                    return this.green(newWord)
                })
            }
        })
    return text
    }
   

   findValue(text,dictionary) {
        const words=Object.values(dictionary)
        words.forEach(word=>{
            let regex = new RegExp(`\\b${word}\\b`,'gi')
            if (regex.test(text)) {
                const ix = words.indexOf(word)
                text=text.replaceAll(regex,()=>{
                    const newWord=Object.keys(dictionary)[ix]
                    return this.green(newWord)
                })
            }
        })
        return text
    }
   
    hoursDot(text) {

        const regex=/[0-2]?\d\.[0-5]\d/g

        if (regex.test(text)) {
            text= text.replace(regex, match => { return this.green(match.replace('.', ':'))})
        }
    return text
    }

    hoursSemicolon(text) {

        const regex=/[0-2]?\d\:[0-5]\d/g

        if (regex.test(text)) {
            text= text.replace(regex, match => { return this.green(match.replace(':', '.'))})
        }
    return text
    }


    titleAmtoBr(text) {
        const title=Object.values(americanToBritishTitles)
        
        title.forEach(item=>{
          
          let regex = new RegExp(`\\b${item}\\.(\\s|\\b)`,'gi')
            
            if (regex.test(text)) {
                const ix=title.indexOf(item)
                text=text.replace(regex,match => {
                let newTitle=Object.values(americanToBritishTitles)[ix];
                    newTitle=newTitle.charAt(0).toUpperCase()+newTitle.slice(1)
                    return this.green(newTitle)+ ' '
               
            })
            }
        })
    return text
    }

    titleBrtoAm(text) {
        const title=Object.values(americanToBritishTitles)
        
        title.forEach(item=>{
         
           let regex = new RegExp(`\\b${item}(\\s|\\b)`,'gi')
            if (regex.test(text)) {
                const ix=title.indexOf(item)
                text=text.replace(regex,match => {
                let newTitle=Object.keys(americanToBritishTitles)[ix];
                    newTitle=newTitle.charAt(0).toUpperCase()+newTitle.slice(1)
                return this.green(newTitle)+ ' '})
            }
        })
    return text
    }

    green(text) {
        return `<span class="highlight">${text}</span>`
    }
}

module.exports = Translator;