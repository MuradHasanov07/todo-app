import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Typography,
  Paper,
  Collapse,
  Fade,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { Todo, Priority } from '../types/todo';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, todo: Partial<Todo>) => void;
}

const priorityColors = {
  Yüksek: 'error',
  Orta: 'warning',
  Düşük: 'success',
} as const;

const categories = ['İş', 'Kişisel', 'Alışveriş', 'Sağlık', 'Diğer'];
const priorities: Priority[] = ['Yüksek', 'Orta', 'Düşük'];

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editForm, setEditForm] = useState<Partial<Todo>>({});
  const [newTag, setNewTag] = useState('');

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setEditForm(todo);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingTodo) {
      onUpdate(editingTodo.id, editForm);
      setEditDialogOpen(false);
      setEditingTodo(null);
      setNewTag('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editForm.tags?.includes(newTag.trim())) {
      setEditForm({
        ...editForm,
        tags: [...(editForm.tags || []), newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setEditForm({
      ...editForm,
      tags: editForm.tags?.filter((tag) => tag !== tagToDelete) || [],
    });
  };

  return (
    <Paper 
      sx={{ 
        p: 2,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#1976d2',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
        }}
      >
        Görevler ({todos.length})
      </Typography>
      <List>
        {todos.map((todo) => (
          <Fade in={true} key={todo.id}>
            <ListItem
              sx={{
                mb: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                sx={{
                  color: todo.completed ? '#4caf50' : '#9e9e9e',
                  '&.Mui-checked': {
                    color: '#4caf50',
                  },
                }}
              />
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                        fontWeight: 'medium',
                      }}
                    >
                      {todo.title}
                    </Typography>
                    <Chip
                      label={todo.priority}
                      size="small"
                      color={priorityColors[todo.priority]}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Chip 
                      label={todo.category} 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: '#1976d2',
                        color: '#1976d2',
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Collapse in={expandedId === todo.id}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {todo.description}
                      </Typography>
                      {todo.dueDate && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          Bitiş: {format(parseISO(todo.dueDate), 'PPP', { locale: tr })}
                        </Typography>
                      )}
                      {todo.tags && todo.tags.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {todo.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{
                                height: 20,
                                fontSize: '0.75rem',
                                borderColor: '#1976d2',
                                color: '#1976d2',
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Collapse>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Detayları Göster/Gizle">
                  <IconButton
                    edge="end"
                    onClick={() => handleExpand(todo.id)}
                    sx={{ mr: 1 }}
                  >
                    {expandedId === todo.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Düzenle">
                  <IconButton
                    edge="end"
                    onClick={() => handleEditClick(todo)}
                    sx={{ mr: 1, color: '#1976d2' }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sil">
                  <IconButton
                    edge="end"
                    onClick={() => onDelete(todo.id)}
                    sx={{ color: '#f44336' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Fade>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Görevi Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Başlık"
              value={editForm.title || ''}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Açıklama"
              value={editForm.description || ''}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={editForm.category || ''}
                label="Kategori"
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Öncelik</InputLabel>
              <Select
                value={editForm.priority || 'Orta'}
                label="Öncelik"
                onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as Priority })}
              >
                {priorities.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Bitiş Tarihi"
              type="date"
              value={editForm.dueDate || ''}
              onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  label="Etiket Ekle"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  size="small"
                  fullWidth
                />
                <Tooltip title="Etiket Ekle">
                  <IconButton
                    onClick={handleAddTag}
                    color="primary"
                    sx={{ bgcolor: '#e3f2fd' }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {editForm.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    color="primary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>İptal</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TodoList; 