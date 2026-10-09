# Circadia — Dark Focus (Obsidian Pine)
# Theme configuration for tmux

# Status bar
set -g status-style "bg=#1a1e1b,fg=#cbc9c4"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#a5c3a4,fg=#131714,bold] #S #[bg=#1a1e1b,fg=#a5c3a4] "
set -g status-right "#[bg=#242a25,fg=#bdbab3] %Y-%m-%d #[fg=#b8b4ac]|#[fg=#cbc9c4,bold] %H:%M #[bg=#a5c3a4,fg=#131714,bold] #h "

# Window status
set -g window-status-format "#[bg=#1a1e1b,fg=#bdbab3]  #I:#W  "
set -g window-status-current-format "#[bg=#242a25,fg=#a5c3a4,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#353c36"
set -g pane-active-border-style "fg=#a5c3a4"

# Messages / Command prompt
set -g message-style "bg=#242a25,fg=#cbc9c4,bold"
set -g message-command-style "bg=#242a25,fg=#cbc9c4"

# Mode / Copy mode selection
set -g mode-style "bg=#242a25,fg=#a5c3a4,bold"

# Clock mode
set -g clock-mode-colour "#a5c3a4"
