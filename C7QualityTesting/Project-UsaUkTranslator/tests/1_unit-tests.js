const chai = require('chai');
const assert = chai.assert;
const americanOnly = require('../components/american-only.js');
const americanToBritishSpelling = require('../components/american-to-british-spelling.js');

const britishOnly = require('../components/british-only.js')
const Translator = require('../components/translator.js');
const trans= new Translator()
function rmvGreen(text) {
    return text.replaceAll('<span class="highlight">','').replaceAll('</span>','')
}

suite('Unit Tests', () => {
    test("Translate Mangoes are my favorite fruit. to British English", ()=>{

        let res =trans.findKey("Mangoes are my favorite fruit.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "Mangoes are my favourite fruit.")
    });
    test("Translate I ate yogurt for breakfast. to British English", ()=>{

        let res =trans.findKey("I ate yogurt for breakfast.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "I ate yoghurt for breakfast.")
    });

    test("Translate We had a party at my friend's condo. to British English", ()=>{

        let res =trans.findKey("We had a party at my friend's condo.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "We had a party at my friend's flat.")
    });

    test("Translate Can you toss this in the trashcan for me? to British English", ()=>{

        let res =trans.findKey("Can you toss this in the trashcan for me?",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "Can you toss this in the bin for me?")
    });

    test("Translate The parking lot was full. to British English", ()=>{

        let res =trans.findKey("The parking lot was full.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "The car park was full.")
    });

    test("Translate Like a high tech Rube Goldberg machine. to British English", ()=>{

        let res =trans.findKey("Like a high tech Rube Goldberg machine.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "Like a high tech Heath Robinson device.")
    });

    test("Translate To play hooky means to skip class or work.", ()=>{

        let res =trans.findKey("To play hooky means to skip class or work.",americanOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "To bunk off means to skip class or work.")
    });

    test("Translate No Mr. Bond, I expect you to die.. to British English", ()=>{

        let res =trans.titleAmtoBr("No Mr. Bond, I expect you to die.")
       
        res=rmvGreen(res)

        assert.equal( res, "No Mr Bond, I expect you to die.")
    });

    test("Translate Dr. Grosh will see you now. to British English", ()=>{

        let res =trans.titleAmtoBr("Dr. Grosh will see you now.")
       
        res=rmvGreen(res)

        assert.equal( res, "Dr Grosh will see you now.")
    }); 

    test("Translate Lunch is at 12:15 today. to British English", ()=>{

        let res =trans.hoursSemicolon("Lunch is at 12:15 today.")     
        res=rmvGreen(res)

        assert.equal( res, "Lunch is at 12.15 today.")
    });

    test("Translate We watched the footie match for a while. to American English", ()=>{

        let res =trans.findKey("We watched the footie match for a while.",britishOnly)
        res=trans.findKey(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal( res, "We watched the soccer match for a while.")
    });

    test("Translate Paracetamol takes up to an hour to work. to American English", ()=>{
        let res= trans.findKey("Paracetamol takes up to an hour to work.",britishOnly)
        res=trans.findValue(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal(res, "Tylenol takes up to an hour to work.")
    })

    test("Translate First, caramelise the onions. to American English", ()=>{
        let res= trans.findKey("First, caramelise the onions.",britishOnly)
        res=trans.findValue(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal(res, "First, caramelize the onions.")
    })

    test("Translate I spent the bank holiday at the funfair. to American English", ()=>{
        let res= trans.findKey("I spent the bank holiday at the funfair.",britishOnly)
        res=trans.findValue(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal(res, "I spent the public holiday at the carnival.")
    })

    test("Translate I had a bicky then went to the chippy. to American English", ()=>{
        let res= trans.findKey("I had a bicky then went to the chippy.",britishOnly)
        
        res=rmvGreen(res)

        assert.equal(res, "I had a cookie then went to the fish-and-fish-and-chip shop.")
    })

    test("Translate I've just got bits and bobs in my bum bag. to American English", ()=>{
        let res= trans.findKey("I've just got bits and bobs in my bum bag.",britishOnly)
        res=trans.findValue(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal(res, "I've just got odds and ends in my fanny pack.")
    })

    test("Translate The car boot sale at Boxted Airfield was called off. to American English", ()=>{
        let res= trans.findKey("The car boot sale at Boxted Airfield was called off.",britishOnly)
        res=trans.findValue(res,americanToBritishSpelling);
        res=rmvGreen(res)

        assert.equal(res, "The swap meet at Boxted Airfield was called off.")
    });

    test("Translate Have you met Mrs Kalyani? to American English", ()=>{

        let res= trans.titleBrtoAm("Have you met Mrs Kalyani?")
        res=rmvGreen(res)

        assert.equal(res, "Have you met Mrs. Kalyani?")
    });

    test("Translate Prof Joyner of King's College, London. to American English", ()=>{

        let res= trans.titleBrtoAm("Prof Joyner of King's College, London.")
        res=rmvGreen(res)

        assert.equal(res, "Prof. Joyner of King's College, London.")
    });
    test("Translate Tea time is usually around 4 or 4.30. to American English", ()=>{

        let res= trans.hoursDot("Tea time is usually around 4 or 4.30.")
        res=rmvGreen(res)

        assert.equal(res, "Tea time is usually around 4 or 4:30.")
    });

    test("Highlight translation in Mangoes are my favorite fruit.", ()=>{

        let res= trans.findKey("Mangoes are my favorite fruit.",americanToBritishSpelling)

        assert.equal(res, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
    });

    test("Highlight translation in I ate yogurt for breakfast.", ()=>{

        let res= trans.findKey("I ate yogurt for breakfast.",americanToBritishSpelling)
    
        assert.equal(res, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
    });
    test("Highlight translation in We watched the footie match for a while.", ()=>{

        let res= trans.findKey("We watched the footie match for a while.",britishOnly)
    
        assert.equal(res, 'We watched the <span class="highlight">soccer</span> match for a while.')
    });
    test("Highlight translation in Paracetamol takes up to an hour to work.", ()=>{

        let res= trans.findKey("Paracetamol takes up to an hour to work.",britishOnly)
    
        assert.equal(res, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
    });
});
