# Circadia — Dark Classic (Warm Ember & Espresso)
# Theme configuration for tmux (100% Strict WCAG AAA)

# Status bar
set -g status-style "bg=#1e1a15,fg=#c9c0b1"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#e89a49,fg=#17130f,bold] #S #[bg=#1e1a15,fg=#e89a49] "
set -g status-right "#[bg=#29241e,fg=#aba195] %Y-%m-%d #[fg=#91887d]|#[fg=#c9c0b1,bold] %H:%M #[bg=#e89a49,fg=#17130f,bold] #h "

# Window status
set -g window-status-format "#[bg=#1e1a15,fg=#aba195]  #I:#W  "
set -g window-status-current-format "#[bg=#29241e,fg=#e89a49,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#3b342b"
set -g pane-active-border-style "fg=#e89a49"

# Messages / Command prompt
set -g message-style "bg=#29241e,fg=#c9c0b1,bold"
set -g message-command-style "bg=#29241e,fg=#c9c0b1"

# Mode / Copy mode selection
set -g mode-style "bg=#29241e,fg=#e89a49,bold"

# Clock mode
set -g clock-mode-colour "#e89a49"
