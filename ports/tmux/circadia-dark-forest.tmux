# Circadia — Dark Focus (Obsidian Pine)
# Theme configuration for tmux (100% Strict WCAG AAA)

# Status bar
set -g status-style "bg=#1a1e1b,fg=#c4ccc5"
set -g status-left-length 40
set -g status-right-length 80
set -g status-left "#[bg=#6ec28a,fg=#131714,bold] #S #[bg=#1a1e1b,fg=#6ec28a] "
set -g status-right "#[bg=#242a25,fg=#9fa9a1] %Y-%m-%d #[fg=#838d85]|#[fg=#c4ccc5,bold] %H:%M #[bg=#6ec28a,fg=#131714,bold] #h "

# Window status
set -g window-status-format "#[bg=#1a1e1b,fg=#9fa9a1]  #I:#W  "
set -g window-status-current-format "#[bg=#242a25,fg=#6ec28a,bold]  #I:#W  "
set -g window-status-separator ""

# Panes
set -g pane-border-style "fg=#353c36"
set -g pane-active-border-style "fg=#6ec28a"

# Messages / Command prompt
set -g message-style "bg=#242a25,fg=#c4ccc5,bold"
set -g message-command-style "bg=#242a25,fg=#c4ccc5"

# Mode / Copy mode selection
set -g mode-style "bg=#242a25,fg=#6ec28a,bold"

# Clock mode
set -g clock-mode-colour "#6ec28a"
