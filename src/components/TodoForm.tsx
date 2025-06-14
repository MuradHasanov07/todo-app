import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Todo, Priority } from '../types/todo';

const categories = ['İş', 'Kişisel', 'Alışveriş', 'Sağlık', 'Diğer'];
const priorities: Priority[] = ['Yüksek', 'Orta', 'Düşük'];

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('Orta');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title,
        description,
        completed: false,
        category,
        priority,
        dueDate,
        tags,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('Orta');
      setDueDate('');
      setTags([]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Fade in={true}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
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
          Yeni Görev Ekle
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              label="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={category}
                  label="Kategori"
                  onChange={(e) => setCategory(e.target.value)}
                  required
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
                  value={priority}
                  label="Öncelik"
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  required
                >
                  {priorities.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="Bitiş Tarihi"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
                {tags.map((tag) => (
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                },
              }}
            >
              Görev Ekle
            </Button>
          </Stack>
        </form>
      </Paper>
    </Fade>
  );
};

export default TodoForm; 