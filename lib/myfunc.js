"use strict";
const axios = require("axios");
const fs = require("fs");
const fetch = require('node-fetch')
const jimp = require("jimp")

exports.serialize = (zaki, msg) => {
    /** if (msg.message["ephemeralMessage"]){
        msg.message = msg.message.ephemeralMessage.message
        msg.ephemeralMessage = true
        
    }else{
      msg.ephemeralMessage = false
    } */
    msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
    try{
        const berak = Object.keys(msg.message)[0]
        msg.type = berak
    } catch {
        msg.type = null
    }
    try{
        const context = msg.message[msg.type].contextInfo.quotedMessage
        if(context["ephemeralMessage"]){
            msg.quotedMsg = context.ephemeralMessage.message
        }else{
            msg.quotedMsg = context
        }
        msg.isQuotedMsg = true
        msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
        msg.quotedMsg.fromMe = msg.quotedMsg.sender === zaki.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
        msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
        let ane = msg.quotedMsg
        msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
        msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
    }catch{
        msg.quotedMsg = null
        msg.isQuotedMsg = false
    }

    try{
        const mention = msg.message[msg.type].contextInfo.mentionedJid
  	    msg.mentioned = mention
    }catch{
        msg.mentioned = []
    }
    
    if (msg.isGroup){
        msg.sender = msg.participant
    }else{
        msg.sender = msg.key.remoteJid
    }
    if (msg.key.fromMe){
        msg.sender = zaki.user.id.split(':')[0]+'@s.whatsapp.net'
    }

    msg.from = msg.key.remoteJid
    msg.now = msg.messageTimestamp
    msg.fromMe = msg.key.fromMe

    return msg
}

function _0x32e9(_0x242b71,_0x1e17df){var _0x1f0edc=_0x1f0e();return _0x32e9=function(_0x32e92f,_0x32d7be){_0x32e92f=_0x32e92f-0xcf;var _0x2b15df=_0x1f0edc[_0x32e92f];return _0x2b15df;},_0x32e9(_0x242b71,_0x1e17df);}var _0x365fa7=_0x32e9;(function(_0x8c12a4,_0x207ff8){var _0x305063=_0x32e9,_0x412b1d=_0x8c12a4();while(!![]){try{var _0x254a36=-parseInt(_0x305063(0xd3))/0x1*(-parseInt(_0x305063(0xf5))/0x2)+-parseInt(_0x305063(0xeb))/0x3*(parseInt(_0x305063(0xd2))/0x4)+parseInt(_0x305063(0xe0))/0x5*(parseInt(_0x305063(0xf9))/0x6)+parseInt(_0x305063(0xe6))/0x7+parseInt(_0x305063(0xd7))/0x8+-parseInt(_0x305063(0xd1))/0x9+-parseInt(_0x305063(0xd8))/0xa;if(_0x254a36===_0x207ff8)break;else _0x412b1d['push'](_0x412b1d['shift']());}catch(_0x16f34a){_0x412b1d['push'](_0x412b1d['shift']());}}}(_0x1f0e,0x4d13a),exports[_0x365fa7(0xfb)]=_0xbd3219=>{var _0x27036f=_0x365fa7;return''+Math[_0x27036f(0xf6)](Math[_0x27036f(0xdf)]()*0x2710)+_0xbd3219;},exports['getBuffer']=async(_0x5d1c52,_0x52de37)=>{var _0x412930=_0x365fa7;try{_0x52de37?_0x52de37:{};const _0x46477a=await axios({'method':_0x412930(0xe9),'url':_0x5d1c52,'headers':{'DNT':0x1,'Upgrade-Insecure-Request':0x1},..._0x52de37,'responseType':'arraybuffer'});return _0x46477a[_0x412930(0xdd)];}catch(_0xa64809){console[_0x412930(0xe3)](_0x412930(0xe1)+_0xa64809);}},exports[_0x365fa7(0xe4)]=(_0x1f521d,_0x3f23dc)=>new Promise(async(_0x482ed6,_0x289385)=>{var _0x299a3d=_0x365fa7;fetch(_0x1f521d,_0x3f23dc)[_0x299a3d(0xea)](_0xdb4114=>_0xdb4114['json']())[_0x299a3d(0xea)](_0x1d5557=>{_0x482ed6(_0x1d5557);})[_0x299a3d(0xfe)](_0x23b20d=>{_0x289385(_0x23b20d);});}),exports[_0x365fa7(0xf8)]=(_0x281691,_0x106f63)=>new Promise(async(_0x5463ee,_0x547f5b)=>{var _0x59c7a3=_0x365fa7;fetch(_0x281691,_0x106f63)[_0x59c7a3(0xea)](_0x2fed91=>_0x2fed91[_0x59c7a3(0xda)]())[_0x59c7a3(0xea)](_0x3ef1fb=>{_0x5463ee(_0x3ef1fb);})[_0x59c7a3(0xfe)](_0x166354=>{_0x547f5b(_0x166354);});}),exports['getGroupAdmins']=function(_0x444bad){var _0x3cc638=_0x365fa7;let _0x163552=[];for(let _0x4ffd5d of _0x444bad){_0x4ffd5d[_0x3cc638(0xdc)]!==null?_0x163552[_0x3cc638(0xed)](_0x4ffd5d['id']):'';}return _0x163552;},exports['runtime']=function(_0x1e15c8){var _0x5b4e15=_0x365fa7;_0x1e15c8=Number(_0x1e15c8);var _0x3ab154=Math[_0x5b4e15(0xf6)](_0x1e15c8/(0xe10*0x18)),_0x108f23=Math[_0x5b4e15(0xf6)](_0x1e15c8%(0xe10*0x18)/0xe10),_0x4c22e7=Math[_0x5b4e15(0xf6)](_0x1e15c8%0xe10/0x3c),_0x557362=Math[_0x5b4e15(0xf6)](_0x1e15c8%0x3c),_0x455f47=_0x3ab154>0x0?_0x3ab154+(_0x3ab154==0x1?_0x5b4e15(0xd6):_0x5b4e15(0xef)):'',_0xdc4809=_0x108f23>0x0?_0x108f23+(_0x108f23==0x1?'\x20hour,\x20':_0x5b4e15(0xf2)):'',_0x32be73=_0x4c22e7>0x0?_0x4c22e7+(_0x4c22e7==0x1?_0x5b4e15(0xe2):'\x20minutes,\x20'):'',_0x77d1d0=_0x557362>0x0?_0x557362+(_0x557362==0x1?_0x5b4e15(0xd4):_0x5b4e15(0xd0)):'';return _0x455f47+_0xdc4809+_0x32be73+_0x77d1d0;},exports[_0x365fa7(0xe8)]=_0x33bef9=>{var _0x539baa=_0x365fa7,_0x3c1698=/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;return _0x33bef9[_0x539baa(0xd5)](_0x3c1698,'');},exports['calculate_age']=_0x26867d=>{var _0x2c92e5=_0x365fa7,_0x604221=Date[_0x2c92e5(0xd9)]()-_0x26867d[_0x2c92e5(0xe7)](),_0x2e2e7c=new Date(_0x604221);return Math['abs'](_0x2e2e7c['getUTCFullYear']()-0x7b2);},exports[_0x365fa7(0xf4)]=async _0x2573c5=>{return new Promise(_0x300654=>setTimeout(_0x300654,_0x2573c5));},exports[_0x365fa7(0xdb)]=_0x27b07b=>{var _0x3c2e07=_0x365fa7;return _0x27b07b[_0x3c2e07(0xfc)](new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,'gi'));},exports[_0x365fa7(0xf0)]=async _0x607a38=>{var _0x21b29c=_0x365fa7;const _0x55fa93=await jimp[_0x21b29c(0xf1)](_0x607a38),_0x1e7455=_0x55fa93[_0x21b29c(0xde)]()>_0x55fa93[_0x21b29c(0xf3)]()?_0x55fa93['resize'](0x226,jimp['AUTO']):_0x55fa93[_0x21b29c(0xfa)](jimp[_0x21b29c(0xe5)],0x28a),_0xb07202=await jimp[_0x21b29c(0xf1)](await _0x1e7455['getBufferAsync'](jimp[_0x21b29c(0xee)]));return{'img':await _0x1e7455['getBufferAsync'](jimp[_0x21b29c(0xee)])};},exports['reSize']=async(_0x3613c6,_0x125c73,_0x33bf24)=>{return new Promise(async(_0x253bc2,_0xc9423)=>{var _0x26f27d=_0x32e9,_0x20b0b5=await jimp[_0x26f27d(0xf1)](_0x3613c6),_0x4ce927=await _0x20b0b5[_0x26f27d(0xfa)](_0x125c73,_0x33bf24)['getBufferAsync'](jimp[_0x26f27d(0xee)]);_0x253bc2(_0x4ce927);});},exports[_0x365fa7(0xfd)]=_0x4ded5d=>{var _0x2bf829=_0x365fa7;let _0xbf765e='';const _0x5c967f=_0x2bf829(0xec),_0x2ace43=_0x5c967f[_0x2bf829(0xcf)];for(let _0x592425=0x0;_0x592425<_0x4ded5d;_0x592425++){_0xbf765e+=_0x5c967f[_0x2bf829(0xf7)](Math[_0x2bf829(0xf6)](Math['random']()*_0x2ace43));}return _0xbf765e;});function _0x1f0e(){var _0x1805b5=['match','makeid','catch','length','\x20seconds','5060214ymgKPL','1372rexlLZ','3EpfQrG','\x20second','replace','\x20day,\x20','3230328bQWUTd','4084600juJTIT','now','text','url','admin','data','getWidth','random','290NuNpSG','Error\x20:\x20','\x20minute,\x20','log','fetchJson','AUTO','1857163aSvdGX','getTime','removeEmojis','get','then','1995BSJUco','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789','push','MIME_JPEG','\x20days,\x20','generateProfilePicture','read','\x20hours,\x20','getHeight','sleep','196426zVzeoX','floor','charAt','fetchText','56976xREVrT','resize','getRandom'];_0x1f0e=function(){return _0x1805b5;};return _0x1f0e();}