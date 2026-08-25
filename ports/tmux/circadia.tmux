#!/usr/bin/env bash
# Circadia tmux TPM plugin entrypoint
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

FLAVOUR=$(tmux show-option -gqv "@circadia_flavour")
if [ -z "$FLAVOUR" ]; then
  FLAVOUR=$(tmux show-option -gqv "@circadia_mode")
fi
if [ -z "$FLAVOUR" ]; then
  FLAVOUR="dark-ember"
fi

FLAVOUR_CLEAN=$(echo "$FLAVOUR" | tr "_" "-")

if [ -f "$CURRENT_DIR/circadia-$FLAVOUR_CLEAN.tmux" ]; then
  tmux source-file "$CURRENT_DIR/circadia-$FLAVOUR_CLEAN.tmux"
else
  tmux source-file "$CURRENT_DIR/circadia-dark-ember.tmux"
fi
