const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Mbuvi_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function Mbuvi_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Mbuvi_Tech = Mbuvi_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                // FIXED VERSION ONLY
                version: [2, 3001, 7],
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_Mbuvi_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Mbuvi_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Mbuvi_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Mbuvi_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === 'open') {

                    // 🔥 IMPORTANT FIX:
                    // allow WhatsApp to fully register the linked device
                    await delay(8000);

                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    
                    let session = await Pair_Code_By_Mbuvi_Tech.sendMessage(
                        Pair_Code_By_Mbuvi_Tech.user.id,
                        { text: 'darkness!' + b64data }
                    );

                    let Mbuvi_MD_TEXT = `
        
╔═════ஜ۩۞۩ஜ═════╗
║ ╚»CONNECTED«╝
║ ✨RED-XMD🔷
║ ✨ DFS🔷
╚─━━━━━━░★░━━━━━━─╝


---

╔═════ஜ۩۞۩ஜ═════╗
║『  DFS SESSION«╝
║ -Set Heroku,Render etc
║ - SESSION_ID: 
╚─━━━━━━░★░━━━━━━─╝
╔═════ஜ۩۞۩ஜ═════╗
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: youtube.com/@SibongakonkeThalente
║❍ 𝐎𝐰𝐧𝐞𝐫: 27634988678
║❍ 𝐑𝐞𝐩𝐨: https://github.com/darknessfreenetsquad/red_xmd 
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/KLI1Cl1dP6Y3gdHptdAiBn?mode=gi_t
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029Vb4HUnJAjPXOWnELU82J
║❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _loading . . ._
║ ☬ ☬ ☬ ☬
╚─━━━━━━░★░━━━━━━─╝
𒂀 Enjoy *RED* XMD


---

 Give Star⭐ To My Repo
╚─━━━━━━░★░━━━━━━─╝`;

                    await Pair_Code_By_Mbuvi_Tech.sendMessage(
                        Pair_Code_By_Mbuvi_Tech.user.id,
                        { text: Mbuvi_MD_TEXT },
                        { quoted: session }
                    );

                    await delay(2000);

                    // close AFTER full registration
                    await Pair_Code_By_Mbuvi_Tech.ws.close();

                    // ❌ DO NOT DELETE SESSION IMMEDIATELY
                    // return await removeFile('./temp/' + id);

                    return;
                }

                else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Mbuvi_MD_PAIR_CODE();
                }

            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Mbuvi_MD_PAIR_CODE();
});

module.exports = router;
