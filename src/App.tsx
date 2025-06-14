import React, { useState, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Fade,
  Tabs,
  Tab,
} from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import CategoryManager from './components/CategoryManager';
import { Todo, Priority } from './types/todo';
import CategoryIcon from '@mui/icons-material/Category';
import ListIcon from '@mui/icons-material/List';

interface Category {
  id: number;
  name: string;
  color: string;
  icon?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories
      ? JSON.parse(savedCategories)
      : [
          { id: 1, name: 'İş', color: '#1976d2' },
          { id: 2, name: 'Kişisel', color: '#2e7d32' },
          { id: 3, name: 'Alışveriş', color: '#d32f2f' },
          { id: 4, name: 'Sağlık', color: '#ed6c02' },
          { id: 5, name: 'Diğer', color: '#9c27b0' },
        ];
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | ''>('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const handleAddCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now(),
    };
    setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = (id: number, updatedCategory: Partial<Category>) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedPriority('');
    setSortBy('date');
  };

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (selectedCategory && todo.category !== selectedCategory) return false;
      if (selectedPriority && todo.priority !== selectedPriority) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'priority': {
          const priorityOrder = { Yüksek: 0, Orta: 1, Düşük: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  mb: 4,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Görev Yöneticisi
              </Typography>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                  value={selectedTab}
                  onChange={(_, newValue) => setSelectedTab(newValue)}
                  centered
                >
                  <Tab
                    icon={<ListIcon />}
                    label="Görevler"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<CategoryIcon />}
                    label="Kategoriler"
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              {selectedTab === 0 ? (
                <>
                  <TodoFilters
                    categories={categories.map((cat) => cat.name)}
                    selectedCategory={selectedCategory}
                    selectedPriority={selectedPriority}
                    sortBy={sortBy}
                    onCategoryChange={setSelectedCategory}
                    onPriorityChange={setSelectedPriority}
                    onSortChange={setSortBy}
                    onClearFilters={handleClearFilters}
                  />
                  <TodoForm onAdd={handleAddTodo} />
                  <TodoList
                    todos={filteredAndSortedTodos}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                  />
                </>
              ) : (
                <CategoryManager
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              )}
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 