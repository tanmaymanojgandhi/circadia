# Circadia — Dark Modern (Plum Noir)
# Theme configuration for tmux

# Status bar
set -g status-style "bg=#1b1419,fg=#cbc9c4"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#b6a3d1,fg=#140e12,bold] #S #[bg=#1b1419,fg=#b6a3d1] "
set -g status-right "#[bg=#261e23,fg=#bdbab3] %Y-%m-%d #[fg=#b8b4ac]|#[fg=#cbc9c4,bold] %H:%M #[bg=#b6a3d1,fg=#140e12,bold] #h "

# Window status
set -g window-status-format "#[bg=#1b1419,fg=#bdbab3]  #I:#W  "
set -g window-status-current-format "#[bg=#261e23,fg=#b6a3d1,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#3d3039"
set -g pane-active-border-style "fg=#b6a3d1"

# Messages / Command prompt
set -g message-style "bg=#261e23,fg=#cbc9c4,bold"
set -g message-command-style "bg=#261e23,fg=#cbc9c4"

# Mode / Copy mode selection
set -g mode-style "bg=#261e23,fg=#b6a3d1,bold"

# Clock mode
set -g clock-mode-colour "#b6a3d1"
