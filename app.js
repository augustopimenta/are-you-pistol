const puppeteer = require('puppeteer');

const [ message, quantity ] = process.argv.slice(2);

if (!message || !quantity) {
  console.log('Parametros incorretos');
  return;
}

const waitFor = async (page, seconds) => {
  for (let s = seconds; s; s--) {
    console.log(`Iniciando em ${s} segundo(s)...`);
    await page.waitFor(1000);
  }
};

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=1024,800`] });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com');

  console.log('Esperando leitura do QR Code e escolha da conversa...');

  await page.waitForXPath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]');
  await waitFor(page, 10);

  console.log('Iniciando!');
  
  for (let i = 0; i < quantity; i++) {
    await page.keyboard.type(message);
    // const button = await page.$x('//*[@id="main"]/footer/div[1]/button');
    const button = await page.$x('//*[@id="main"]/footer/div[1]/div[3]/button');
    await button[0].click();
  }

  await page.waitFor(5000);
  //await browser.close();

  console.log('Finalizado! Feche tudo quando os envios finalizarem!');
})();