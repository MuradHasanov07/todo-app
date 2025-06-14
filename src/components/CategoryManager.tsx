import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Tooltip,
  Fade,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Category {
  id: number;
  name: string;
  color: string;
  icon?: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onUpdateCategory: (id: number, category: Partial<Category>) => void;
  onDeleteCategory: (id: number) => void;
}

const defaultColors = [
  '#1976d2', // Mavi
  '#2e7d32', // Yeşil
  '#d32f2f', // Kırmızı
  '#ed6c02', // Turuncu
  '#9c27b0', // Mor
  '#0288d1', // Açık Mavi
  '#7b1fa2', // Koyu Mor
  '#c2185b', // Pembe
];

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(defaultColors[0]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory({
        name: newCategoryName.trim(),
        color: selectedColor,
      });
      setNewCategoryName('');
      setSelectedColor(defaultColors[0]);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingCategory) {
      onUpdateCategory(editingCategory.id, editingCategory);
      setEditDialogOpen(false);
      setEditingCategory(null);
    }
  };

  return (
    <Fade in={true}>
      <Paper
        sx={{
          p: 3,
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
          Kategori Yönetimi
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Yeni Kategori"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {defaultColors.map((color) => (
                <Tooltip key={color} title="Renk Seç">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: selectedColor === color ? '2px solid #000' : 'none',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                </Tooltip>
              ))}
            </Box>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              },
            }}
          >
            Kategori Ekle
          </Button>
        </Box>

        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: category.color,
                  borderRadius: '50%',
                  mr: 2,
                }}
              />
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  sx: { fontWeight: 'medium' },
                }}
              />
              <ListItemSecondaryAction>
                <Tooltip title="Düzenle">
                  <IconButton
                    edge="end"
                    onClick={() => handleEditClick(category)}
                    sx={{ mr: 1, color: '#1976d2' }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sil">
                  <IconButton
                    edge="end"
                    onClick={() => onDeleteCategory(category.id)}
                    sx={{ color: '#f44336' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Kategori Düzenle</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                label="Kategori Adı"
                value={editingCategory?.name || ''}
                onChange={(e) =>
                  setEditingCategory(
                    editingCategory
                      ? { ...editingCategory, name: e.target.value }
                      : null
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" gutterBottom>
                Renk Seç
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {defaultColors.map((color) => (
                  <Tooltip key={color} title="Renk Seç">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: color,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border:
                          editingCategory?.color === color
                            ? '2px solid #000'
                            : 'none',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                      onClick={() =>
                        setEditingCategory(
                          editingCategory
                            ? { ...editingCategory, color }
                            : null
                        )
                      }
                    />
                  </Tooltip>
                ))}
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
    </Fade>
  );
};

export default CategoryManager; 