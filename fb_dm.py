import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

businesses = [
    ("HBA", "https://www.facebook.com/p/HBA-100063442136590/"),
    ("Bellissima Hair and Beauty", "https://www.facebook.com/bellissimahairandbeautyuk/"),
    ("Headfirst Hair & Beauty", "https://www.facebook.com/HeadfirstSalonLeeds/"),
    ("Regal Salons", "https://www.facebook.com/p/Regal-Salons-100063773934251/"),
    ("The Salon Hair & Beauty", "https://www.facebook.com/TheSalonHairWakefield/"),
    ("Bliss Hair & Beauty Salon", "https://www.facebook.com/morleyleeds/"),
    ("Teisha's Hair and Beauty", "https://www.facebook.com/TeishasHairBeautyAndBarberSalon/"),
    ("Beautique", "https://www.facebook.com/BeautiqueHuddersfield/"),
    ("The Harrogate Hair and Beauty Clinic", "https://www.facebook.com/harrogatehairandbeautyclinic/"),
    ("Pearl Beauty & Hair Salon", "https://www.facebook.com/pearlbeautyharrogate/"),
    ("Charlotte Woolley Hairdressing", "https://www.facebook.com/p/Charlotte-Woolley-Hairdressing-61551267462307/"),
    ("The Beauty Bar", "https://www.facebook.com/thebeautybarharrogate"),
    ("Sparrow Hair and Beauty", "https://www.facebook.com/sparrowhairandbeauty/"),
    ("Beverley Hills Hair & Beauty", "https://www.facebook.com/p/Beverley-Hills-Hair-Beauty-100063359001572/"),
    ("PERLA Hair & Beauty", "https://www.facebook.com/AisteAdomonePerla/"),
    ("The Hair & Beauty Lounge", "https://www.facebook.com/hairbeautyloungebeverley/"),
    ("Mark Lee Hairdressing", "https://www.facebook.com/p/Mark-Lee-Hairdressing-Beverley-61554973662604/"),
    ("ZED HAIR at home", "https://www.facebook.com/ZEDHAIRathome/"),
    ("The Hair Salon", "https://www.facebook.com/TheHairSalon1"),
    ("The Hairstylists", "https://www.facebook.com/1231469733642820/"),
    ("Hair Salon Near Me", "https://www.facebook.com/hairsalonnearmebawtry/"),
    ("The Hair & Beauty House", "https://www.facebook.com/Hannahlouiserafter/"),
    ("Mr Craig's Hair Salon", "https://www.facebook.com/MrCraigs/"),
    ("H & Company Hair Salon", "https://www.facebook.com/p/H-Company-Hair-Salon-Pontefract-100063689283459/"),
    ("Rapunzels", "https://www.facebook.com/p/Rapunzels-100063736232683/"),
    ("Studio Hair and Beauty", "https://www.facebook.com/studiohairandbeautybarnsley/"),
    ("Aspire Hairdressing", "https://www.facebook.com/aspiretogreathair/"),
    ("Luskiw Hairdressing", "https://www.facebook.com/luskiwhairdressing/"),
    ("Natalie's Hair Salon", "https://www.facebook.com/NataliesHairSalonDewsbury/"),
    ("The Town Salon", "https://www.facebook.com/thetownsalon65/"),
    ("Sorelle Hair & Beauty", "https://www.facebook.com/sorellehairandbeautyy/"),
    ("No 12 The Hair Emporium", "https://www.facebook.com/no12thehairemporium/"),
    ("ReeseMarc Hair Salon", "https://www.facebook.com/ReeseMarc.hair/"),
    ("Co&Co Hair and Nails", "https://www.facebook.com/coandcohair/"),
    ("Leeds Barbershop", "https://www.facebook.com/p/Leeds-Barbershop-100063595597400/"),
    ("Thornton's Barbers", "https://www.facebook.com/thorntonsbarbers/"),
    ("Temple Barbershop Leeds", "https://www.facebook.com/p/Temple-Barbershop-Leeds-100063472265488/"),
    ("Matthew's Barbers", "https://www.facebook.com/MatthewsBarbers/"),
    ("The Gentlemans Quarters", "https://www.facebook.com/thebarbersleeds/"),
    ("The Barber Shop", "https://www.facebook.com/TheBarberShopAbbeyLane/"),
    ("Savills Barbers", "https://www.facebook.com/Savillsbarbers/"),
    ("The Bradford Barbershop", "https://www.facebook.com/p/The-Bradford-Barbershop-61560047746083/"),
    ("Johno's Mobile Barbers", "https://www.facebook.com/mobileshaver/"),
    ("HIS & HERS Barbers and Salon", "https://www.facebook.com/p/HIS-HERS-Barbers-and-Salon-100063644648445/"),
    ("Barber To Your Door", "https://www.facebook.com/barbertoyourdooruk"),
    ("The Barbers Shop at The Whiterooms", "https://www.facebook.com/WhiteRoomsBarbers/"),
    ("Gaffers Barbering", "https://www.facebook.com/Gaffersbarbering/"),
    ("Blades Barbershop", "https://www.facebook.com/bladesbarbershopwakefield/"),
    ("Bash Barbers", "https://www.facebook.com/people/Bash-barbers/61567162117018/"),
    ("Fresh Fades Barbers", "https://www.facebook.com/p/Fresh-Fades-Barbers-61574645895233/"),
    ("Barbarian Barbershop", "https://www.facebook.com/barberbarbarian/"),
    ("Ouz's Barberz", "https://www.facebook.com/p/Ouzs-Barberz-100063551864151/"),
    ("KRAFT Barbers", "https://www.facebook.com/kraftbarbers/"),
    ("Forthmans Barbers", "https://www.facebook.com/p/Forthmans-barbers-100092499639437/"),
    ("JJ's Hair Beauty and Barbers", "https://www.facebook.com/p/JJs-Hair-Beauty-and-Barbers-100063689288193/"),
    ("Minster Barber", "https://www.facebook.com/thebarber2018/"),
    ("BEX Barbers", "https://www.facebook.com/BEXBarbers01/"),
    ("Men Only Salons", "https://www.facebook.com/menonlysalonshull/"),
    ("Gents Barbers", "https://www.facebook.com/p/Gents-Barbers-100054517027897/"),
    ("Peter Gotthard Hairdressers & Barbers", "https://www.facebook.com/PeterGotthardHarrogate/"),
    ("City Barber", "https://www.facebook.com/p/City-Barber-100028752263831/"),
    ("Bluebeards Barbershop", "https://www.facebook.com/Bluebeardsbarbershop/"),
    ("Harrogate Barbers", "https://www.facebook.com/kurdishstylebarber/"),
    ("The Barber Harrogate", "https://www.facebook.com/thebarberharrogate/"),
    ("Yorkshire Plumbers & Builders", "https://www.facebook.com/people/Yorkshire-Plumbers-Builders/100063555213335/"),
    ("HA Heating", "https://www.facebook.com/haheating/"),
    ("Yorkshire Plumber", "https://www.facebook.com/p/Yorkshire-plumber-61553280211798/"),
    ("Yorkshire Plumbing, Heating & Bathrooms", "https://www.facebook.com/yorkshireplumbingheating"),
    ("Yorkshire Plumbing and Heating", "https://www.facebook.com/Yorkshireplumbingandheating/"),
    ("Pro-Tech Plumbing & Heating", "https://www.facebook.com/protechheating/"),
    ("Whittaker Plumbing and Heating", "https://www.facebook.com/whittakerpnh/"),
    ("Barnsley Plumbing & Gas Services", "https://www.facebook.com/p/Barnsley-plumbing-gas-services-61557902243051/"),
    ("Lock and Flow Plumbing & Heating", "https://www.facebook.com/p/Lock-and-Flow-Plumbing-Heating-Ltd-61575864014067/"),
    ("MB Heating Solutions", "https://www.facebook.com/mbheatingsolutions/"),
    ("Rowglo Plumbing and Heating", "https://www.facebook.com/Rowglo"),
    ("Shaw Plumbing and Heating", "https://www.facebook.com/shawphltd/"),
    ("Kassgas Ltd", "https://www.facebook.com/kassgasltd/"),
    ("Yorkshire Electricians Ltd", "https://www.facebook.com/yorkshireelectricians/"),
    ("Britannia Building Services", "https://www.facebook.com/Britanniabuild.co.uk/"),
    ("Emergency Electrician Bradford", "https://www.facebook.com/bfdelectrician/"),
    ("Electrical Services Leeds", "https://www.facebook.com/people/Electrical-Services-Leeds/100057140364663/"),
    ("Lucid Electrical Services", "https://www.facebook.com/lucidelectricalservices/"),
    ("Lockwood Electrical Contractors", "https://www.facebook.com/p/Lockwood-Electrical-Contractors-100057612843999/"),
    ("ElectriciansLeeds", "https://www.facebook.com/ElectriciansLeeds/"),
    ("MKD Electrical", "https://www.facebook.com/p/MKD-Electrical-61560115666540/"),
    ("Your Local Electrician Leeds", "https://www.facebook.com/yleleeds/"),
    ("SS Electrical Leeds", "https://www.facebook.com/sselectrcialleeds/"),
    ("Roebuck Electrical Contractors", "https://www.facebook.com/p/Roebuck-Electrical-Contractors-61558779189701/"),
    ("Top Notch Decorators Yorkshire", "https://www.facebook.com/topnotchpaintersdecorators/"),
    ("Thorp & Co. Decorators", "https://www.facebook.com/p/Thorp-Co-Decorators-61573180450450/"),
    ("Liz Semple Painting & Decorating", "https://www.facebook.com/p/Liz-Semple-Painting-Decorating-100076339054743/"),
    ("Carters Painting and Decorating", "https://www.facebook.com/carterspaintanddecorating/"),
    ("DPL Painter and Decorator", "https://www.facebook.com/DPLPAINTINGANDDECORATING/"),
    ("Rooms Painters & Decorators", "https://www.facebook.com/RoomsPainters"),
    ("Samantha Storr Painting & Decorating", "https://www.facebook.com/S.Storrpainter/"),
    ("JLT Professional Painter & Decorator", "https://www.facebook.com/p/JLT-Professional-Painter-Decorator-61551125694215/"),
    ("Smith's of York - Painters", "https://www.facebook.com/smithsofyork/"),
    ("York Decorator", "https://www.facebook.com/YorkDecorator/"),
    ("The Harrogate Decorator", "https://www.facebook.com/theharrogatedecorator/"),
    ("Scott Barlow Painter & Decorator", "https://www.facebook.com/p/Scott-Barlow-Painter-Decorator-Harrogate-100046425503294/"),
    ("Whiterose Decorators", "https://www.facebook.com/Painteranddecoratorscarborough/"),
    ("Scarborough Painter", "https://www.facebook.com/p/Scarborough-Painter-61572373893154/"),
    ("A & T McGovern Painters", "https://www.facebook.com/AandTMcgovern/"),
    ("Decorated by Daniel", "https://www.facebook.com/DecoratedByDaniel/"),
    ("Morgan Gilby Painting & Decorating", "https://www.facebook.com/morgangilbypainting/"),
    ("Leeds Roofing Company", "https://www.facebook.com/leedsroofingcompany/"),
    ("M & S Roofing Leeds", "https://www.facebook.com/mandsroofers/"),
    ("Leeds Reliable Roofers", "https://www.facebook.com/leedsreliableroofers/"),
    ("British Roofing and Building", "https://www.facebook.com/p/British-Roofing-and-Building-100057146214165/"),
    ("The Family Roofing Company", "https://www.facebook.com/TheFamilyRoofingCompany/"),
    ("Yorkshire Roofing Group", "https://www.facebook.com/yorkshireroofinggroup/"),
    ("Wilson Roofing Solutions", "https://www.facebook.com/p/Wilson-Roofing-Solutions-Limited-61555615982742/"),
    ("J.Y.M Roofing", "https://www.facebook.com/JYMroofing/"),
    ("Roofology Leeds", "https://www.facebook.com/RoofologyLeeds/"),
    ("Bradford Roofing Services", "https://www.facebook.com/p/Bradford-roofing-services-Ltd-61580714616711/"),
    ("North Yorkshire Roofing & Repairs", "https://www.facebook.com/p/North-Yorkshire-Roofing-Repairs-61580682471673/"),
    ("VT Roofing Services", "https://www.facebook.com/p/VT-Roofing-Services-61578338489796/"),
    ("King Roofing North Yorkshire", "https://www.facebook.com/KingRoofingHarrogate/"),
    ("APR Roofing & Building Solutions", "https://www.facebook.com/p/APR-Roofing-Building-Solutions-61555602602524/"),
    ("HRS Roofing Services", "https://www.facebook.com/HarrogateRoofingServices/"),
    ("JP Roofing", "https://www.facebook.com/JP.Roofing.NorthYorkshire/"),
    ("SJS Roofing", "https://www.facebook.com/SJSRoofingScarborough/"),
    ("Hoyle Builders", "https://www.facebook.com/N.Hoylebuilders/"),
    ("HD Building Services", "https://www.facebook.com/hdbuildingservices/"),
    ("Builders in Doncaster", "https://www.facebook.com/buildersindoncaster/"),
    ("Jack G Building", "https://www.facebook.com/Jackgbuilder/"),
    ("Remmer Construction", "https://www.facebook.com/erdesignandbuild/"),
    ("Your Building Works", "https://www.facebook.com/YourBuildingWorksLtd/"),
    ("Honeycombe Design & Build", "https://www.facebook.com/honeycombe/"),
]

def make_message(name):
    return (
        "Hey\n\n"
        f"I think {name} would be a really good match for our free website plan, "
        "currently running for new and local Yorkshire businesses. All 5 star trustpilot reviews! ⭐️\n\n"
        "It's completely free to get the website - you just cover the cost of hosting, "
        "£19 a month or £17 a month on our annual plan.\n\n"
        "Let me know if you'd like more details!"
    )

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.facebook.com")

input("\n👉 Log into Facebook in the Chrome window (complete any 2FA too), then press ENTER here...\n")

sent, skipped = [], []

for name, url in businesses:
    try:
        driver.get(url)
        time.sleep(3)

        btns = driver.find_elements(By.XPATH,
            '//a[@aria-label="Message"] | //div[@aria-label="Message"] | '
            '//a[normalize-space()="Message"] | //span[normalize-space()="Message"]'
        )
        if not btns:
            print(f"SKIP (no btn): {name}")
            skipped.append((name, "no message button"))
            continue

        original_window = driver.current_window_handle
        btns[0].click()
        time.sleep(4)

        # Switch to new tab/window if one opened
        if len(driver.window_handles) > 1:
            for handle in driver.window_handles:
                if handle != original_window:
                    driver.switch_to.window(handle)
                    break
            time.sleep(3)

        boxes = driver.find_elements(By.XPATH, '//*[@role="textbox" and @contenteditable="true"]')
        if not boxes:
            print(f"SKIP (no input): {name}")
            skipped.append((name, "no chat input"))
            # close extra tab if opened
            if len(driver.window_handles) > 1:
                driver.close()
                driver.switch_to.window(original_window)
            continue

        box = boxes[-1]
        box.click()
        msg = make_message(name)
        for line in msg.split("\n"):
            box.send_keys(line)
            box.send_keys(Keys.SHIFT + Keys.RETURN)
        box.send_keys(Keys.RETURN)
        time.sleep(2)

        # Close messenger tab and go back
        if len(driver.window_handles) > 1:
            driver.close()
            driver.switch_to.window(original_window)
        print(f"SENT: {name}")
        sent.append(name)
        time.sleep(random.uniform(3, 6))

    except Exception as e:
        print(f"ERROR: {name} - {e}")
        skipped.append((name, str(e)))

print(f"\n--- DONE ---\nSent: {len(sent)}\nSkipped: {len(skipped)}")
input("Press ENTER to close...")
driver.quit()
