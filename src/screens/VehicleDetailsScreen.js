import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  IconButton,
  Chip,
  Divider,
  useTheme,
  List,
  Badge,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Store
import useStore from '../store/useStore';

const VehicleDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { vehicle } = route.params;
  const { favorites, toggleFavorite, addMaintenanceRecord } = useStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const isFavorite = favorites.includes(vehicle.vin);

  const handleShare = async () => {
    try {
      const message = `Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}\nVIN: ${vehicle.vin}\nEngine: ${vehicle.engine?.cylinders} cylinder, ${vehicle.engine?.displacement}L\nOil: ${vehicle.maintenance?.oil?.type}`;
      
      await Share.share({
        message,
        title: 'Vehicle Information',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share vehicle information');
    }
  };

  const handleFindParts = () => {
    const searchQuery = encodeURIComponent(`${vehicle.year} ${vehicle.make} ${vehicle.model} parts`);
    Linking.openURL(`https://www.google.com/search?q=${searchQuery}`);
  };

  const handleFindDealer = () => {
    const searchQuery = encodeURIComponent(`${vehicle.make} dealer near me`);
    Linking.openURL(`https://www.google.com/maps/search/${searchQuery}`);
  };

  const handleAddMaintenance = () => {
    Alert.prompt(
      'Add Maintenance Record',
      'Enter maintenance details:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: (text) => {
            if (text) {
              const record = {
                id: Date.now(),
                date: new Date().toISOString(),
                description: text,
                type: 'maintenance',
              };
              addMaintenanceRecord(vehicle.vin, record);
              Alert.alert('Success', 'Maintenance record added');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const renderOverview = () => (
    <>
      {/* Basic Info Card */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Title style={styles.vehicleTitle}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Title>
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={isFavorite ? theme.colors.error : theme.colors.primary}
              size={24}
              onPress={() => toggleFavorite(vehicle.vin)}
            />
          </View>
          <Paragraph style={styles.vin}>{vehicle.vin}</Paragraph>
          <Paragraph style={styles.trim}>{vehicle.trim || 'Base Trim'}</Paragraph>
          
          <View style={styles.chipContainer}>
            <Chip icon="engine" style={styles.chip}>
              {vehicle.engine?.cylinders || 'N/A'} cyl
            </Chip>
            <Chip icon="cog" style={styles.chip}>
              {vehicle.transmission?.type || 'N/A'}
            </Chip>
            <Chip icon="car" style={styles.chip}>
              {vehicle.drivetrain || 'N/A'}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Maintenance Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Maintenance Info</Title>
          
          <List.Section>
            <List.Item
              title="Oil Type"
              description={vehicle.maintenance?.oil?.type || 'Not specified'}
              left={props => <List.Icon {...props} icon="oil" />}
              right={props => <Paragraph>{vehicle.maintenance?.oil?.capacity || 'N/A'}</Paragraph>}
            />
            <Divider />
            <List.Item
              title="Tire Pressure"
              description="Recommended PSI"
              left={props => <List.Icon {...props} icon="tire" />}
              right={props => (
                <View style={styles.tirePressure}>
                  <Paragraph>Front: {vehicle.maintenance?.tires?.frontPressure || 'N/A'}</Paragraph>
                  <Paragraph>Rear: {vehicle.maintenance?.tires?.rearPressure || 'N/A'}</Paragraph>
                </View>
              )}
            />
            <Divider />
            <List.Item
              title="Oil Change Interval"
              description="Recommended mileage"
              left={props => <List.Icon {...props} icon="calendar-clock" />}
              right={props => <Paragraph>{vehicle.maintenance?.oil?.interval || 'N/A'}</Paragraph>}
            />
            <Divider />
            <List.Item
              title="Tire Rotation"
              description="Recommended interval"
              left={props => <List.Icon {...props} icon="rotate-right" />}
              right={props => <Paragraph>{vehicle.maintenance?.tires?.rotationInterval || 'N/A'}</Paragraph>}
            />
          </List.Section>
        </Card.Content>
      </Card>

      {/* Fluids Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Fluids & Filters</Title>
          
          <View style={styles.fluidGrid}>
            <View style={styles.fluidItem}>
              <Icon name="coolant" size={24} color={theme.colors.info} />
              <Paragraph style={styles.fluidLabel}>Coolant</Paragraph>
              <Paragraph style={styles.fluidValue}>
                {vehicle.maintenance?.fluids?.coolant || 'N/A'}
              </Paragraph>
            </View>
            
            <View style={styles.fluidItem}>
              <Icon name="transmission" size={24} color={theme.colors.warning} />
              <Paragraph style={styles.fluidLabel}>Transmission</Paragraph>
              <Paragraph style={styles.fluidValue}>
                {vehicle.maintenance?.fluids?.transmission || 'N/A'}
              </Paragraph>
            </View>
            
            <View style={styles.fluidItem}>
              <Icon name="brake" size={24} color={theme.colors.error} />
              <Paragraph style={styles.fluidLabel}>Brake</Paragraph>
              <Paragraph style={styles.fluidValue}>
                {vehicle.maintenance?.fluids?.brake || 'N/A'}
              </Paragraph>
            </View>
            
            <View style={styles.fluidItem}>
              <Icon name="filter" size={24} color={theme.colors.success} />
              <Paragraph style={styles.fluidLabel}>Air Filter</Paragraph>
              <Paragraph style={styles.fluidValue}>
                {vehicle.maintenance?.filters?.air || 'N/A'}
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );

  const renderSpecs = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Specifications</Title>
        
        <List.Section>
          <List.Item
            title="Engine"
            description={`${vehicle.engine?.cylinders || 'N/A'} cylinder, ${vehicle.engine?.displacement || 'N/A'}L`}
            left={props => <List.Icon {...props} icon="engine" />}
            right={props => <Paragraph>{vehicle.engine?.horsepower || 'N/A'} HP</Paragraph>}
          />
          <Divider />
          
          <List.Item
            title="Transmission"
            description={vehicle.transmission?.type || 'N/A'}
            left={props => <List.Icon {...props} icon="cog" />}
            right={props => <Paragraph>{vehicle.transmission?.speeds || 'N/A'} speeds</Paragraph>}
          />
          <Divider />
          
          <List.Item
            title="Fuel Type"
            description={vehicle.engine?.type || 'N/A'}
            left={props => <List.Icon {...props} icon="fuel" />}
          />
          <Divider />
          
          <List.Item
            title="Body Style"
            description={vehicle.bodyClass || 'N/A'}
            left={props => <List.Icon {...props} icon="car" />}
            right={props => <Paragraph>{vehicle.doors || 'N/A'} doors</Paragraph>}
          />
          <Divider />
          
          <List.Item
            title="Manufacturer"
            description={vehicle.manufacturer || 'N/A'}
            left={props => <List.Icon {...props} icon="factory" />}
            right={props => <Paragraph>{vehicle.country || 'N/A'}</Paragraph>}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );

  const renderActions = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Actions</Title>
        
        <View style={styles.actionGrid}>
          <Button
            mode="contained"
            icon="share-variant"
            onPress={handleShare}
            style={styles.actionButton}
          >
            Share
          </Button>
          
          <Button
            mode="contained"
            icon="wrench"
            onPress={handleAddMaintenance}
            style={styles.actionButton}
          >
            Add Service
          </Button>
          
          <Button
            mode="contained"
            icon="magnify"
            onPress={handleFindParts}
            style={styles.actionButton}
          >
            Find Parts
          </Button>
          
          <Button
            mode="contained"
            icon="map-marker"
            onPress={handleFindDealer}
            style={styles.actionButton}
          >
            Find Dealer
          </Button>
          
          <Button
            mode="outlined"
            icon="alert"
            onPress={() => Alert.alert('Recall Check', 'This would check for recalls in a real app')}
            style={styles.actionButton}
          >
            Check Recalls
          </Button>
          
          <Button
            mode="outlined"
            icon="gas-station"
            onPress={() => navigation.navigate('FuelTracking', { vin: vehicle.vin })}
            style={styles.actionButton}
          >
            Fuel Tracking
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* Tab Navigation */}
        <Card style={styles.tabCard}>
          <Card.Content>
            <View style={styles.tabContainer}>
              <Button
                mode={activeTab === 'overview' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('overview')}
                style={styles.tabButton}
              >
                Overview
              </Button>
              <Button
                mode={activeTab === 'specs' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('specs')}
                style={styles.tabButton}
              >
                Specs
              </Button>
              <Button
                mode={activeTab === 'actions' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('actions')}
                style={styles.tabButton}
              >
                Actions
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Content based on active tab */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'specs' && renderSpecs()}
        {activeTab === 'actions' && renderActions()}

        {/* Additional Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Additional Notes</Title>
            <Paragraph style={styles.note}>
              • Vehicle information is based on VIN decoding and estimated maintenance data.
            </Paragraph>
            <Paragraph style={styles.note}>
              • Always consult your owner's manual for exact specifications.
            </Paragraph>
            <Paragraph style={styles.note}>
              • Maintenance intervals may vary based on driving conditions.
            </Paragraph>
            <Paragraph style={styles.note}>
              • Contact a certified mechanic for professional advice.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabCard: {
    margin: 16,
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  card: {
    margin: 16,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  vin: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: 'gray',
    marginBottom: 4,
  },
  trim: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tirePressure: {
    alignItems: 'flex-end',
  },
  fluidGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fluidItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  fluidLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  fluidValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 12,
  },
  note: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default VehicleDetailsScreen;