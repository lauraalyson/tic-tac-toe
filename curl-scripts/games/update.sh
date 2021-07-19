#!/bin/bash

# TOKEN="6f2c0f0c325229fbbbef8e37b97759e3" INDEX="0" VALUE="X" sh curl-scripts/games/update.sh

# don't use a password you use for any real websites!
API="https://tic-tac-toe-api-development.herokuapp.com"
URL_PATH="/games"


 curl "${API}${URL_PATH}/${ID}" \
 --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "game": {
      "cell": {
        "index": "'"${INDEX}"'",
        "value": "'"${VALUE}"'"
      },
      "over": false
    }
  }'

 echo
