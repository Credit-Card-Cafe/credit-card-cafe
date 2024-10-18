import psycopg2
import sys

banks = [ {"bank_name": "Bank of America", "bank_url": "bofa", "bank_type": "National Bank"}, {"bank_name": "Chase Bank", "bank_url": "chase", "bank_type": "National Bank"}, {"bank_name": "American Express", "bank_url": "amex", "bank_type": "National Bank"}, {"bank_name": "Discover", "bank_url": "discover", "bank_type": "National Bank"}, {"bank_name": "Capital One", "bank_url": "c1", "bank_type": "National Bank"}, {"bank_name": "US Bank", "bank_url": "usbank", "bank_type": "National Bank"}, {"bank_name": "Citi", "bank_url": "citi", "bank_type": "National Bank"}, {"bank_name": "Pentagon Federal", "bank_url": "penfed", "bank_type": "Credit Union"}, {"bank_name": "TD Bank", "bank_url": "tdbank", "bank_type": "National Bank"}, {"bank_name": "Goldman Sachs", "bank_url": "goldmansachs", "bank_type": "National Bank"}, {"bank_name": "Coastal Community Bank", "bank_url": "coastal-community", "bank_type": "Financial Service"}, {"bank_name": "Elan Financial Services", "bank_url": "elan", "bank_type": "Financial Service"}, {"bank_name": "Synchrony", "bank_url": "synchrony", "bank_type": "National Bank"}, {"bank_name": "Wells Fargo", "bank_url": "wf", "bank_type": "National Bank"} ]

brands = [     {"brand_name": "Apple", "brand_url": "apple", "brand_co": False},     {"brand_name": "Costco", "brand_url": "costco", "brand_co": True},     {"brand_name": "Bilt", "brand_url": "bilt", "brand_co": False},     {"brand_name": "REI", "brand_url": "rei", "brand_co": False},     {"brand_name": "Hilton", "brand_url": "hilton", "brand_co": True},     {"brand_name": "Marriott", "brand_url": "marriott", "brand_co": True},     {"brand_name": "BMW", "brand_url": "bmw", "brand_co": False},     {"brand_name": "Seen.com", "brand_url": "seen", "brand_co": False},     {"brand_name": "Robinhood", "brand_url": "robinhood", "brand_co": False},     {"brand_name": "Amazon", "brand_url": "amazon", "brand_co": False} ]

try:
    conn = psycopg2.connect("host=localhost dbname=dev user=root password=toor")
    cur = conn.cursor()
except:
    print("Could not connect to the database.")
    sys.exit()

def populate_banks():
    for bank in banks:
        cur.execute("INSERT INTO banks (bank_name, bank_url, bank_type) VALUES (%s, %s, %s)",
                    (bank["bank_name"], bank["bank_url"], bank["bank_type"]))


def populate_brands():
    for brand in brands:
        cur.execute("INSERT INTO brands (brand_name, brand_url, brand_type) VALUES (%s, %s, %s)",
                    (brand["brand_name"], brand["brand_url"], brand["brand_type"]))

choice = input("What would you like to populate Banks(bk), Brands(br): ")
if choice.lower() in ["banks", "bk"]:
    populate_banks()
elif choice.lower() in ["brands", "br"]:
    populate_brands()
else:
    print("Please choose a valid option!")

