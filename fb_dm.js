const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const EMAIL = process.env.FB_EMAIL;
const PASSWORD = process.env.FB_PASS;
const SESSION_FILE = path.join(__dirname, 'fb_session.json');

const MESSAGE_TEMPLATE = `Hey

I think {name} would be a really good match for our free website plan, currently running for new and local Yorkshire businesses. All 5 star trustpilot reviews! ⭐️

It's completely free to get the website — you just cover the cost of hosting, £19 a month or £17 a month on our annual plan.

Let me know if you'd like more details!`;

const businesses = [
  { name: "HBA", url: "https://www.facebook.com/p/HBA-100063442136590/" },
  { name: "Bellissima Hair and Beauty", url: "https://www.facebook.com/bellissimahairandbeautyuk/" },
  { name: "Headfirst Hair & Beauty", url: "https://www.facebook.com/HeadfirstSalonLeeds/" },
  { name: "Regal Salons", url: "https://www.facebook.com/p/Regal-Salons-100063773934251/" },
  { name: "The Salon Hair & Beauty", url: "https://www.facebook.com/TheSalonHairWakefield/" },
  { name: "Bliss Hair & Beauty Salon", url: "https://www.facebook.com/morleyleeds/" },
  { name: "Teisha's Hair and Beauty", url: "https://www.facebook.com/TeishasHairBeautyAndBarberSalon/" },
  { name: "Beautique", url: "https://www.facebook.com/BeautiqueHuddersfield/" },
  { name: "The Harrogate Hair and Beauty Clinic", url: "https://www.facebook.com/harrogatehairandbeautyclinic/" },
  { name: "Pearl Beauty & Hair Salon", url: "https://www.facebook.com/pearlbeautyharrogate/" },
  { name: "Charlotte Woolley Hairdressing", url: "https://www.facebook.com/p/Charlotte-Woolley-Hairdressing-61551267462307/" },
  { name: "The Beauty Bar", url: "https://www.facebook.com/thebeautybarharrogate" },
  { name: "Sparrow Hair and Beauty", url: "https://www.facebook.com/sparrowhairandbeauty/" },
  { name: "Beverley Hills Hair & Beauty", url: "https://www.facebook.com/p/Beverley-Hills-Hair-Beauty-100063359001572/" },
  { name: "PERLA Hair & Beauty", url: "https://www.facebook.com/AisteAdomonePerla/" },
  { name: "The Hair & Beauty Lounge", url: "https://www.facebook.com/hairbeautyloungebeverley/" },
  { name: "Mark Lee Hairdressing", url: "https://www.facebook.com/p/Mark-Lee-Hairdressing-Beverley-61554973662604/" },
  { name: "ZED HAIR at home", url: "https://www.facebook.com/ZEDHAIRathome/" },
  { name: "The Hair Salon", url: "https://www.facebook.com/TheHairSalon1" },
  { name: "The Hairstylists", url: "https://www.facebook.com/1231469733642820/" },
  { name: "Hair Salon Near Me", url: "https://www.facebook.com/hairsalonnearmebawtry/" },
  { name: "The Hair & Beauty House", url: "https://www.facebook.com/Hannahlouiserafter/" },
  { name: "Mr Craig's Hair Salon", url: "https://www.facebook.com/MrCraigs/" },
  { name: "H & Company Hair Salon", url: "https://www.facebook.com/p/H-Company-Hair-Salon-Pontefract-100063689283459/" },
  { name: "Rapunzels", url: "https://www.facebook.com/p/Rapunzels-100063736232683/" },
  { name: "Studio Hair and Beauty", url: "https://www.facebook.com/studiohairandbeautybarnsley/" },
  { name: "Aspire Hairdressing", url: "https://www.facebook.com/aspiretogreathair/" },
  { name: "Luskiw Hairdressing", url: "https://www.facebook.com/luskiwhairdressing/" },
  { name: "Natalie's Hair Salon", url: "https://www.facebook.com/NataliesHairSalonDewsbury/" },
  { name: "The Town Salon", url: "https://www.facebook.com/thetownsalon65/" },
  { name: "Sorelle Hair & Beauty", url: "https://www.facebook.com/sorellehairandbeautyy/" },
  { name: "No 12 The Hair Emporium", url: "https://www.facebook.com/no12thehairemporium/" },
  { name: "ReeseMarc Hair Salon", url: "https://www.facebook.com/ReeseMarc.hair/" },
  { name: "Co&Co Hair and Nails", url: "https://www.facebook.com/coandcohair/" },
  { name: "Leeds Barbershop", url: "https://www.facebook.com/p/Leeds-Barbershop-100063595597400/" },
  { name: "Thornton's Barbers", url: "https://www.facebook.com/thorntonsbarbers/" },
  { name: "Temple Barbershop Leeds", url: "https://www.facebook.com/p/Temple-Barbershop-Leeds-100063472265488/" },
  { name: "Matthew's Barbers", url: "https://www.facebook.com/MatthewsBarbers/" },
  { name: "The Gentlemans Quarters", url: "https://www.facebook.com/thebarbersleeds/" },
  { name: "The Barber Shop", url: "https://www.facebook.com/TheBarberShopAbbeyLane/" },
  { name: "Savills Barbers", url: "https://www.facebook.com/Savillsbarbers/" },
  { name: "The Bradford Barbershop", url: "https://www.facebook.com/p/The-Bradford-Barbershop-61560047746083/" },
  { name: "Johno's Mobile Barbers", url: "https://www.facebook.com/mobileshaver/" },
  { name: "HIS & HERS Barbers and Salon", url: "https://www.facebook.com/p/HIS-HERS-Barbers-and-Salon-100063644648445/" },
  { name: "Barber To Your Door", url: "https://www.facebook.com/barbertoyourdooruk" },
  { name: "The Barbers Shop at The Whiterooms", url: "https://www.facebook.com/WhiteRoomsBarbers/" },
  { name: "Gaffers Barbering", url: "https://www.facebook.com/Gaffersbarbering/" },
  { name: "Blades Barbershop", url: "https://www.facebook.com/bladesbarbershopwakefield/" },
  { name: "Bash Barbers", url: "https://www.facebook.com/people/Bash-barbers/61567162117018/" },
  { name: "Fresh Fades Barbers", url: "https://www.facebook.com/p/Fresh-Fades-Barbers-61574645895233/" },
  { name: "Barbarian Barbershop", url: "https://www.facebook.com/barberbarbarian/" },
  { name: "Ouz's Barberz", url: "https://www.facebook.com/p/Ouzs-Barberz-100063551864151/" },
  { name: "KRAFT Barbers", url: "https://www.facebook.com/kraftbarbers/" },
  { name: "Forthmans Barbers", url: "https://www.facebook.com/p/Forthmans-barbers-100092499639437/" },
  { name: "JJ's Hair Beauty and Barbers", url: "https://www.facebook.com/p/JJs-Hair-Beauty-and-Barbers-100063689288193/" },
  { name: "Minster Barber", url: "https://www.facebook.com/thebarber2018/" },
  { name: "BEX Barbers", url: "https://www.facebook.com/BEXBarbers01/" },
  { name: "Men Only Salons", url: "https://www.facebook.com/menonlysalonshull/" },
  { name: "Gents Barbers", url: "https://www.facebook.com/p/Gents-Barbers-100054517027897/" },
  { name: "Peter Gotthard Hairdressers & Barbers", url: "https://www.facebook.com/PeterGotthardHarrogate/" },
  { name: "City Barber", url: "https://www.facebook.com/p/City-Barber-100028752263831/" },
  { name: "Bluebeards Barbershop", url: "https://www.facebook.com/Bluebeardsbarbershop/" },
  { name: "Harrogate Barbers", url: "https://www.facebook.com/kurdishstylebarber/" },
  { name: "The Barber Harrogate", url: "https://www.facebook.com/thebarberharrogate/" },
  { name: "Yorkshire Plumbers & Builders", url: "https://www.facebook.com/people/Yorkshire-Plumbers-Builders/100063555213335/" },
  { name: "HA Heating", url: "https://www.facebook.com/haheating/" },
  { name: "Yorkshire Plumber", url: "https://www.facebook.com/p/Yorkshire-plumber-61553280211798/" },
  { name: "Yorkshire Plumbing, Heating & Bathrooms", url: "https://www.facebook.com/yorkshireplumbingheating" },
  { name: "Yorkshire Plumbing and Heating", url: "https://www.facebook.com/Yorkshireplumbingandheating/" },
  { name: "Pro-Tech Plumbing & Heating", url: "https://www.facebook.com/protechheating/" },
  { name: "Whittaker Plumbing and Heating", url: "https://www.facebook.com/whittakerpnh/" },
  { name: "Barnsley Plumbing & Gas Services", url: "https://www.facebook.com/p/Barnsley-plumbing-gas-services-61557902243051/" },
  { name: "Lock and Flow Plumbing & Heating", url: "https://www.facebook.com/p/Lock-and-Flow-Plumbing-Heating-Ltd-61575864014067/" },
  { name: "MB Heating Solutions", url: "https://www.facebook.com/mbheatingsolutions/" },
  { name: "Rowglo Plumbing and Heating", url: "https://www.facebook.com/Rowglo" },
  { name: "Shaw Plumbing and Heating", url: "https://www.facebook.com/shawphltd/" },
  { name: "Kassgas Ltd", url: "https://www.facebook.com/kassgasltd/" },
  { name: "Yorkshire Electricians Ltd", url: "https://www.facebook.com/yorkshireelectricians/" },
  { name: "Britannia Building Services", url: "https://www.facebook.com/Britanniabuild.co.uk/" },
  { name: "Emergency Electrician Bradford", url: "https://www.facebook.com/bfdelectrician/" },
  { name: "Electrical Services Leeds", url: "https://www.facebook.com/people/Electrical-Services-Leeds/100057140364663/" },
  { name: "Lucid Electrical Services", url: "https://www.facebook.com/lucidelectricalservices/" },
  { name: "Lockwood Electrical Contractors", url: "https://www.facebook.com/p/Lockwood-Electrical-Contractors-100057612843999/" },
  { name: "ElectriciansLeeds", url: "https://www.facebook.com/ElectriciansLeeds/" },
  { name: "MKD Electrical", url: "https://www.facebook.com/p/MKD-Electrical-61560115666540/" },
  { name: "Your Local Electrician Leeds", url: "https://www.facebook.com/yleleeds/" },
  { name: "SS Electrical Leeds", url: "https://www.facebook.com/sselectrcialleeds/" },
  { name: "Roebuck Electrical Contractors", url: "https://www.facebook.com/p/Roebuck-Electrical-Contractors-61558779189701/" },
  { name: "Top Notch Decorators Yorkshire", url: "https://www.facebook.com/topnotchpaintersdecorators/" },
  { name: "Thorp & Co. Decorators", url: "https://www.facebook.com/p/Thorp-Co-Decorators-61573180450450/" },
  { name: "Liz Semple Painting & Decorating", url: "https://www.facebook.com/p/Liz-Semple-Painting-Decorating-100076339054743/" },
  { name: "Carters Painting and Decorating", url: "https://www.facebook.com/carterspaintanddecorating/" },
  { name: "DPL Painter and Decorator", url: "https://www.facebook.com/DPLPAINTINGANDDECORATING/" },
  { name: "Rooms Painters & Decorators", url: "https://www.facebook.com/RoomsPainters" },
  { name: "Samantha Storr Painting & Decorating", url: "https://www.facebook.com/S.Storrpainter/" },
  { name: "JLT Professional Painter & Decorator", url: "https://www.facebook.com/p/JLT-Professional-Painter-Decorator-61551125694215/" },
  { name: "Smith's of York – Painters", url: "https://www.facebook.com/smithsofyork/" },
  { name: "York Decorator", url: "https://www.facebook.com/YorkDecorator/" },
  { name: "The Harrogate Decorator", url: "https://www.facebook.com/theharrogatedecorator/" },
  { name: "Scott Barlow Painter & Decorator", url: "https://www.facebook.com/p/Scott-Barlow-Painter-Decorator-Harrogate-100046425503294/" },
  { name: "Whiterose Decorators", url: "https://www.facebook.com/Painteranddecoratorscarborough/" },
  { name: "Scarborough Painter", url: "https://www.facebook.com/p/Scarborough-Painter-61572373893154/" },
  { name: "A & T McGovern Painters", url: "https://www.facebook.com/AandTMcgovern/" },
  { name: "Decorated by Daniel", url: "https://www.facebook.com/DecoratedByDaniel/" },
  { name: "Morgan Gilby Painting & Decorating", url: "https://www.facebook.com/morgangilbypainting/" },
  { name: "Leeds Roofing Company", url: "https://www.facebook.com/leedsroofingcompany/" },
  { name: "M & S Roofing Leeds", url: "https://www.facebook.com/mandsroofers/" },
  { name: "Leeds Reliable Roofers", url: "https://www.facebook.com/leedsreliableroofers/" },
  { name: "British Roofing and Building", url: "https://www.facebook.com/p/British-Roofing-and-Building-100057146214165/" },
  { name: "The Family Roofing Company", url: "https://www.facebook.com/TheFamilyRoofingCompany/" },
  { name: "Yorkshire Roofing Group", url: "https://www.facebook.com/yorkshireroofinggroup/" },
  { name: "Wilson Roofing Solutions", url: "https://www.facebook.com/p/Wilson-Roofing-Solutions-Limited-61555615982742/" },
  { name: "J.Y.M Roofing", url: "https://www.facebook.com/JYMroofing/" },
  { name: "Roofology Leeds", url: "https://www.facebook.com/RoofologyLeeds/" },
  { name: "Bradford Roofing Services", url: "https://www.facebook.com/p/Bradford-roofing-services-Ltd-61580714616711/" },
  { name: "North Yorkshire Roofing & Repairs", url: "https://www.facebook.com/p/North-Yorkshire-Roofing-Repairs-61580682471673/" },
  { name: "VT Roofing Services", url: "https://www.facebook.com/p/VT-Roofing-Services-61578338489796/" },
  { name: "King Roofing North Yorkshire", url: "https://www.facebook.com/KingRoofingHarrogate/" },
  { name: "APR Roofing & Building Solutions", url: "https://www.facebook.com/p/APR-Roofing-Building-Solutions-61555602602524/" },
  { name: "HRS Roofing Services", url: "https://www.facebook.com/HarrogateRoofingServices/" },
  { name: "JP Roofing", url: "https://www.facebook.com/JP.Roofing.NorthYorkshire/" },
  { name: "SJS Roofing", url: "https://www.facebook.com/SJSRoofingScarborough/" },
  { name: "Hoyle Builders", url: "https://www.facebook.com/N.Hoylebuilders/" },
  { name: "HD Building Services", url: "https://www.facebook.com/hdbuildingservices/" },
  { name: "Builders in Doncaster", url: "https://www.facebook.com/buildersindoncaster/" },
  { name: "Jack G Building", url: "https://www.facebook.com/Jackgbuilder/" },
  { name: "Remmer Construction", url: "https://www.facebook.com/erdesignandbuild/" },
  { name: "Your Building Works", url: "https://www.facebook.com/YourBuildingWorksLtd/" },
  { name: "Honeycombe Design & Build", url: "https://www.facebook.com/honeycombe/" },
];

const results = [];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function sendDM(page, business) {
  const message = MESSAGE_TEMPLATE.replace('{name}', business.name);
  try {
    await page.goto(business.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(2000);

    try {
      const closeBtn = page.locator('[aria-label="Close"]').first();
      if (await closeBtn.isVisible({ timeout: 2000 })) await closeBtn.click();
    } catch {}

    const sendMsgBtn = page.getByRole('link', { name: 'Message' }).or(page.getByRole('button', { name: 'Message' })).first();

    let clicked = false;
    try {
      if (await sendMsgBtn.isVisible({ timeout: 3000 })) {
        await sendMsgBtn.click();
        clicked = true;
      }
    } catch {}

    if (!clicked) {
      results.push({ name: business.name, status: 'no Message button' });
      console.log(`SKIP (no message btn): ${business.name}`);
      return;
    }

    await sleep(3000);

    const chatInput = page.locator('[contenteditable="true"][role="textbox"]').or(page.locator('div[aria-label="Message"]')).last();
    try {
      await chatInput.waitFor({ timeout: 8000 });
      await chatInput.click();

      const lines = message.split('\n');
      for (let i = 0; i < lines.length; i++) {
        await chatInput.type(lines[i], { delay: 20 });
        if (i < lines.length - 1) {
          await page.keyboard.press('Shift+Enter');
        }
      }

      await sleep(500);
      await page.keyboard.press('Enter');
      await sleep(1500);

      results.push({ name: business.name, status: 'sent' });
      console.log(`SENT: ${business.name}`);
    } catch (e) {
      results.push({ name: business.name, status: `chat input not found: ${e.message}` });
      console.log(`FAIL (input): ${business.name} — ${e.message}`);
    }

  } catch (e) {
    results.push({ name: business.name, status: `error: ${e.message}` });
    console.log(`ERROR: ${business.name} — ${e.message}`);
  }
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const sessionExists = fs.existsSync(SESSION_FILE);
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    storageState: sessionExists ? SESSION_FILE : undefined,
  });

  const page = await context.newPage();

  if (!sessionExists) {
    console.log('No saved session found. Please log in manually in the browser.');
    await page.goto('https://www.facebook.com/login', { waitUntil: 'domcontentloaded' });
    console.log('\n👉 Log into Facebook in the browser window (including any 2FA).');
    console.log('Press ENTER here once you are fully logged in and see your Facebook home feed...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    await context.storageState({ path: SESSION_FILE });
    console.log('Session saved. Will reuse next time.');
  } else {
    console.log('Using saved session...');
    await page.goto('https://www.facebook.com', { waitUntil: 'domcontentloaded' });
    await sleep(2000);
  }

  console.log('Logged in. Starting DMs...');

  try {
    for (const business of businesses) {
      await sendDM(page, business);
      await sleep(3000 + Math.random() * 2000);
    }
  } catch (e) {
    console.error('Fatal error during sending:', e.message);
  }

  console.log('\n--- RESULTS ---');
  const sent = results.filter(r => r.status === 'sent');
  const skipped = results.filter(r => r.status !== 'sent');
  console.log(`Sent: ${sent.length}`);
  sent.forEach(r => console.log(`  ✓ ${r.name}`));
  console.log(`Skipped/Failed: ${skipped.length}`);
  skipped.forEach(r => console.log(`  ✗ ${r.name} — ${r.status}`));

  console.log('\nDone. Press ENTER to close browser...');
  await new Promise(resolve => process.stdin.once('data', resolve));

  await browser.close();
})().catch(e => {
  console.error('Startup error:', e.message);
  process.exit(1);
});
