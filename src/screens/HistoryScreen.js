import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  SectionList,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Searchbar,
  IconButton,
  Menu,
  Divider,
  useTheme,
  List,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Store
import useStore from '../store/useStore';
import HistoryCard from '../components/HistoryCard';

const HistoryScreen = ({ navigation }) => {
  const theme = useTheme();
  const { history, favorites, clearHistory } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);

  // Filter and sort history
  const filteredHistory = history.filter((vehicle) => {
    const matchesSearch = searchQuery === '' || 
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' ||
      (filterBy === 'favorites' && favorites.includes(vehicle.vin)) ||
      (filterBy === 'recent' && isRecent(vehicle.timestamp));
    
    return matchesSearch && matchesFilter;
  });

  // Sort history
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'make':
        return a.make.localeCompare(b.make);
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  // Group by date for section list
  const groupedHistory = sortedHistory.reduce((groups, vehicle) => {
    const date = new Date(vehicle.timestamp);
    const dateKey = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(vehicle);
    return groups;
  }, {});

  const sections = Object.keys(groupedHistory).map((date) => ({
    title: date,
    data: groupedHistory[date],
  }));

  const isRecent = (timestamp) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(timestamp) > oneWeekAgo;
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearHistory();
            Alert.alert('Success', 'History cleared');
          },
        },
      ]
    );
  };

  const handleVehiclePress = (vehicle) => {
    navigation.navigate('VehicleDetails', { vehicle });
  };

  const renderEmptyState = () => (
    <Card style={styles.emptyCard}>
      <Card.Content style={styles.emptyContent}>
        <Icon name="history" size={64} color={theme.colors.secondaryText} />
        <Title style={styles.emptyTitle}>No History Yet</Title>
        <Paragraph style={styles.emptyText}>
          Look up a VIN to see it here. Your history will be saved for quick access.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.emptyButton}
          icon="car"
        >
          Look Up a VIN
        </Button>
      </Card.Content>
    </Card>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Title style={styles.sectionTitle}>{title}</Title>
    </View>
  );

  const renderItem = ({ item }) => (
    <HistoryCard
      vehicle={item}
      onPress={() => handleVehiclePress(item)}
      isFavorite={favorites.includes(item.vin)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerRow}>
            <View>
              <Title style={styles.title}>Lookup History</Title>
              <Paragraph style={styles.subtitle}>
                {history.length} vehicle{history.length !== 1 ? 's' : ''} looked up
              </Paragraph>
            </View>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => setMenuVisible(true)}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  setMenuVisible(false);
                  handleClearHistory();
                }}
                title="Clear History"
                leadingIcon="delete"
              />
              <Menu.Item
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Settings');
                }}
                title="Settings"
                leadingIcon="cog"
              />
            </Menu>
          </View>
        </Card.Content>
      </Card>

      {/* Search and Filters */}
      <Card style={styles.filterCard}>
        <Card.Content>
          <Searchbar
            placeholder="Search history..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
          
          <View style={styles.filterRow}>
            <Button
              mode={filterBy === 'all' ? 'contained' : 'outlined'}
              onPress={() => setFilterBy('all')}
              style={styles.filterButton}
              compact
            >
              All
            </Button>
            <Button
              mode={filterBy === 'favorites' ? 'contained' : 'outlined'}
              onPress={() => setFilterBy('favorites')}
              style={styles.filterButton}
              compact
              icon="heart"
            >
              Favorites
            </Button>
            <Button
              mode={filterBy === 'recent' ? 'contained' : 'outlined'}
              onPress={() => setFilterBy('recent')}
              style={styles.filterButton}
              compact
              icon="clock"
            >
              Recent
            </Button>
          </View>

          <View style={styles.sortRow}>
            <Paragraph style={styles.sortLabel}>Sort by:</Paragraph>
            <Button
              mode={sortBy === 'recent' ? 'contained' : 'text'}
              onPress={() => setSortBy('recent')}
              style={styles.sortButton}
              compact
            >
              Recent
            </Button>
            <Button
              mode={sortBy === 'oldest' ? 'contained' : 'text'}
              onPress={() => setSortBy('oldest')}
              style={styles.sortButton}
              compact
            >
              Oldest
            </Button>
            <Button
              mode={sortBy === 'make' ? 'contained' : 'text'}
              onPress={() => setSortBy('make')}
              style={styles.sortButton}
              compact
            >
              Make
            </Button>
            <Button
              mode={sortBy === 'year' ? 'contained' : 'text'}
              onPress={() => setSortBy('year')}
              style={styles.sortButton}
              compact
            >
              Year
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* History List */}
      {sortedHistory.length === 0 ? (
        renderEmptyState()
      ) : (
        <Card style={styles.listCard}>
          <Card.Content style={styles.listContent}>
            <SectionList
              sections={sections}
              keyExtractor={(item, index) => item.vin + index}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              stickySectionHeadersEnabled={false}
              contentContainerStyle={styles.sectionList}
              showsVerticalScrollIndicator={false}
            />
          </Card.Content>
        </Card>
      )}

      {/* Stats Summary */}
      {history.length > 0 && (
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.statsTitle}>History Stats</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>{history.length}</Paragraph>
                <Paragraph style={styles.statLabel}>Total</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>{favorites.length}</Paragraph>
                <Paragraph style={styles.statLabel}>Favorites</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>
                  {history.filter(v => isRecent(v.timestamp)).length}
                </Paragraph>
                <Paragraph style={styles.statLabel}>This Week</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>
                  {new Set(history.map(v => v.make)).size}
                </Paragraph>
                <Paragraph style={styles.statLabel}>Makes</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  filterCard: {
    margin: 16,
    marginVertical: 8,
  },
  searchbar: {
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    marginRight: 8,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sortLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  sortButton: {
    marginRight: 4,
    marginBottom: 4,
  },
  listCard: {
    margin: 16,
    marginVertical: 8,
    flex: 1,
  },
  listContent: {
    padding: 0,
  },
  sectionList: {
    paddingBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
  emptyCard: {
    margin: 16,
    marginVertical: 8,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    minWidth: 200,
  },
  statsCard: {
    margin: 16,
    marginVertical: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
});

export default HistoryScreen;