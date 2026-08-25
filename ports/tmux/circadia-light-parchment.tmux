# Circadia — Warm Parchment
# Theme configuration for tmux (100% Strict WCAG AAA)

# Status bar
set -g status-style "bg=#eee7d6,fg=#28323a"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#0048b3,fg=#f7f2e6,bold] #S #[bg=#eee7d6,fg=#0048b3] "
set -g status-right "#[bg=#e5dcc6,fg=#46535f] %Y-%m-%d #[fg=#43505c]|#[fg=#28323a,bold] %H:%M #[bg=#0048b3,fg=#f7f2e6,bold] #h "

# Window status
set -g window-status-format "#[bg=#eee7d6,fg=#46535f]  #I:#W  "
set -g window-status-current-format "#[bg=#e5dcc6,fg=#0048b3,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#d7cdb7"
set -g pane-active-border-style "fg=#0048b3"

# Messages / Command prompt
set -g message-style "bg=#e5dcc6,fg=#28323a,bold"
set -g message-command-style "bg=#e5dcc6,fg=#28323a"

# Mode / Copy mode selection
set -g mode-style "bg=#e5dcc6,fg=#0048b3,bold"

# Clock mode
set -g clock-mode-colour "#0048b3"
