#!/bin/bash
# Set REACT_APP_CODESPACE_NAME from CODESPACE_NAME if available
if [ -n "$CODESPACE_NAME" ]; then
  export REACT_APP_CODESPACE_NAME=$CODESPACE_NAME
  echo "REACT_APP_CODESPACE_NAME set to: $REACT_APP_CODESPACE_NAME"
else
  echo "CODESPACE_NAME not set, using localhost"
fi

# Start the React app
npm start
