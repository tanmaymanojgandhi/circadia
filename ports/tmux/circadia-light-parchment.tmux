# Circadia — Warm Parchment
# Theme configuration for tmux

# Status bar
set -g status-style "bg=#efebe2,fg=#28323a"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#003fa0,fg=#f7f4ec,bold] #S #[bg=#efebe2,fg=#003fa0] "
set -g status-right "#[bg=#e5e0d5,fg=#394652] %Y-%m-%d #[fg=#3e4750]|#[fg=#28323a,bold] %H:%M #[bg=#003fa0,fg=#f7f4ec,bold] #h "

# Window status
set -g window-status-format "#[bg=#efebe2,fg=#394652]  #I:#W  "
set -g window-status-current-format "#[bg=#e5e0d5,fg=#003fa0,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#d2cbbf"
set -g pane-active-border-style "fg=#003fa0"

# Messages / Command prompt
set -g message-style "bg=#e5e0d5,fg=#28323a,bold"
set -g message-command-style "bg=#e5e0d5,fg=#28323a"

# Mode / Copy mode selection
set -g mode-style "bg=#e5e0d5,fg=#003fa0,bold"

# Clock mode
set -g clock-mode-colour "#003fa0"
