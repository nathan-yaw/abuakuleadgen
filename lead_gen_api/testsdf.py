from apify_client import ApifyClient
import json
import os

TOKEN = os.environ.get("APIFY_TOKEN")
apify = ApifyClient(TOKEN)

actor_client = apify.actor('compass/google-maps-extractor')
input_data = {'locationQuery':"Slough",
            "maxCrawledPlacesPerSearch": 3,
            "searchStringsArray": ["restaurant"]
            }

result = actor_client.call(run_input=input_data, timeout_secs=60)
dataset_client = apify.dataset(result['defaultDatasetId'])
list_items_result = dataset_client.list_items()
items = list_items_result.items 

restaurants = []
num = 1
for entry in items:
    restaurant = {
        "id":num,
        "name": entry.get("title", "").strip(),
        "industry": "Restaurants/Catering",
        "Location": "Slough, UK",
        "phone": entry.get("phone", "").strip(),
        "size": "1-50"
    }
    num+= 1
    restaurants.append(restaurant)

print(json.dumps(restaurants))
        