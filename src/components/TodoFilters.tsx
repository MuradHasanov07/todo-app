import React from 'react';
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Priority } from '../types/todo';

interface TodoFiltersProps {
  categories: string[];
  selectedCategory: string;
  selectedPriority: Priority | '';
  sortBy: 'date' | 'priority' | 'title';
  onCategoryChange: (category: string) => void;
  onPriorityChange: (priority: Priority | '') => void;
  onSortChange: (sortBy: 'date' | 'priority' | 'title') => void;
  onClearFilters: () => void;
}

const priorities: Priority[] = ['Yüksek', 'Orta', 'Düşük'];

const TodoFilters: React.FC<TodoFiltersProps> = ({
  categories,
  selectedCategory,
  selectedPriority,
  sortBy,
  onCategoryChange,
  onPriorityChange,
  onSortChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedCategory || selectedPriority || sortBy !== 'date';

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        borderRadius: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          Filtreler
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Kategori</InputLabel>
          <Select
            value={selectedCategory}
            label="Kategori"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">Tümü</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Öncelik</InputLabel>
          <Select
            value={selectedPriority}
            label="Öncelik"
            onChange={(e) => onPriorityChange(e.target.value as Priority | '')}
          >
            <MenuItem value="">Tümü</MenuItem>
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Sıralama</InputLabel>
          <Select
            value={sortBy}
            label="Sıralama"
            onChange={(e) => onSortChange(e.target.value as 'date' | 'priority' | 'title')}
          >
            <MenuItem value="date">Tarihe Göre</MenuItem>
            <MenuItem value="priority">Önceliğe Göre</MenuItem>
            <MenuItem value="title">Başlığa Göre</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {hasActiveFilters && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Aktif Filtreler:
          </Typography>
          {selectedCategory && (
            <Chip
              label={`Kategori: ${selectedCategory}`}
              onDelete={() => onCategoryChange('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {selectedPriority && (
            <Chip
              label={`Öncelik: ${selectedPriority}`}
              onDelete={() => onPriorityChange('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          <Chip
            label={`Sıralama: ${
              sortBy === 'date'
                ? 'Tarihe Göre'
                : sortBy === 'priority'
                ? 'Önceliğe Göre'
                : 'Başlığa Göre'
            }`}
            onDelete={() => onSortChange('date')}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Tooltip title="Tüm Filtreleri Temizle">
            <IconButton
              onClick={onClearFilters}
              size="small"
              sx={{ ml: 'auto' }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Paper>
  );
};

export default TodoFilters; 