import yweather
client = yweather.Client()

x = client.fetch_woeid("New Zealand")
# x = client.fetch_weather("2478200")
print x
# ['country']

# with open("hello.txt", "w") as f:
# 	f.write(x['location']['country'])

# '23424748'
