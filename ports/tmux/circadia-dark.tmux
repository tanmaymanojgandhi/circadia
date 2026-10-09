# Circadia — Dark Classic (Warm Ember & Espresso)
# Theme configuration for tmux

# Status bar
set -g status-style "bg=#1e1a15,fg=#cbc9c4"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#d6b078,fg=#17130f,bold] #S #[bg=#1e1a15,fg=#d6b078] "
set -g status-right "#[bg=#29241e,fg=#bdbab3] %Y-%m-%d #[fg=#b8b4ac]|#[fg=#cbc9c4,bold] %H:%M #[bg=#d6b078,fg=#17130f,bold] #h "

# Window status
set -g window-status-format "#[bg=#1e1a15,fg=#bdbab3]  #I:#W  "
set -g window-status-current-format "#[bg=#29241e,fg=#d6b078,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#3b342b"
set -g pane-active-border-style "fg=#d6b078"

# Messages / Command prompt
set -g message-style "bg=#29241e,fg=#cbc9c4,bold"
set -g message-command-style "bg=#29241e,fg=#cbc9c4"

# Mode / Copy mode selection
set -g mode-style "bg=#29241e,fg=#d6b078,bold"

# Clock mode
set -g clock-mode-colour "#d6b078"
