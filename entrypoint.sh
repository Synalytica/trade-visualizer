#!/bin/sh
# determine which script to run

if [ -z "$DEBUG" ]; then
    echo "Need to set \$DEBUG"
    exit 1
fi

if [ "$DEBUG" = 1 ]; then
    npm start
else
    npm run-script build \
        && serve -s build/ -p $PORT
fi
