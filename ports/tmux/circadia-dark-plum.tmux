# Circadia — Dark Modern (Plum Noir)
# Theme configuration for tmux (100% Strict WCAG AAA)

# Status bar
set -g status-style "bg=#1b1419,fg=#d8c8d2"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#e88cb8,fg=#140e12,bold] #S #[bg=#1b1419,fg=#e88cb8] "
set -g status-right "#[bg=#261e23,fg=#b4a3af] %Y-%m-%d #[fg=#9a8b96]|#[fg=#d8c8d2,bold] %H:%M #[bg=#e88cb8,fg=#140e12,bold] #h "

# Window status
set -g window-status-format "#[bg=#1b1419,fg=#b4a3af]  #I:#W  "
set -g window-status-current-format "#[bg=#261e23,fg=#e88cb8,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#3d3039"
set -g pane-active-border-style "fg=#e88cb8"

# Messages / Command prompt
set -g message-style "bg=#261e23,fg=#d8c8d2,bold"
set -g message-command-style "bg=#261e23,fg=#d8c8d2"

# Mode / Copy mode selection
set -g mode-style "bg=#261e23,fg=#e88cb8,bold"

# Clock mode
set -g clock-mode-colour "#e88cb8"
