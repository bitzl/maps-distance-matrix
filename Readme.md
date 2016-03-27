# Distance Matrix

This software creates a list of travel information from random locations to a certain destination. Requirements are specified in a json file:

    {
      "apiKey": "API_KEY",
      "samples": 40,
      "file": "marienplatz.csv",
      "destination": {
        "latitude": 48.137493,
        "longitude": 11.575363
      },
      "range": {
        "latitude": [47.637493, 48.637493],
        "longitude": [11.075363, 12.075363]
      }
    }

To query new data, run

    node index.js <config>

If the out file exists, new data will be appended.
