import os
import requests

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + os.environ["SHAREGPT_KEY"]
}

# url = "http://localhost:3000/api/conversations?type=new&page=2&search=python"
url = "https://sharegpt.com/api/conversations?type=new&page=2&search=python"

req = requests.get(url, headers=headers)
print(req.text)



