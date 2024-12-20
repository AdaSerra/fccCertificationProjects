'use strict';
const americanOnly = require('../components/american-only.js');
const americanToBritishSpelling = require('../components/american-to-british-spelling.js');

const britishOnly = require('../components/british-only.js')
const Translator = require('../components/translator.js');
const translator = new Translator();

module.exports = function (app) {
  
  

  app.route('/api/translate')
    .post((req, res) => {
      const {text,locale} =req.body
      if(text==='') { res.json({error: 'No text to translate'})}
      if(!locale || !text) { res.json({error: 'Required field(s) missing' })}
     
      if(locale != "american-to-british" && locale !="british-to-american") {return res.json({error: 'Invalid value for locale field' })}
    
     
      if (locale=="american-to-british") {
       
        let textStart=text;
        
        let textTrans = '';

       
        textTrans=translator.findKey(textStart,americanOnly);
        textTrans=translator.findKey(textTrans,americanToBritishSpelling);
       
        textTrans=translator.hoursSemicolon(textTrans);
        textTrans=translator.titleAmtoBr(textTrans)

        return textTrans!=textStart? res.json({text:text, translation:textTrans}) : res.json({text:text, translation:"Everything looks good to me!"})
        
 
      }

      else {

        let textStart =text;
        let textTrans='';
        textTrans=translator.findKey(textStart,britishOnly);
        textTrans=translator.findValue(textTrans,americanToBritishSpelling);
        textTrans=translator.hoursDot(textTrans);
        textTrans=translator.titleBrtoAm(textTrans)

        return textTrans!=textStart? res.json({text:text, translation:textTrans}) : res.json({text:text, translation:"Everything looks good to me!"})


      }
    });
};
