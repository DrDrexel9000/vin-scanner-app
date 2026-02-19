import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  FAB,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Services & Store
import { decodeVIN, validateVIN, mockOCRScan } from '../services/vinService';
import useStore from '../store/useStore';

// Components
import HistoryCard from '../components/HistoryCard';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const { history, addToHistory, favorites } = useStore();

  const handleLookup = async () => {
    const validation = validateVIN(vin);
    if (!validation.valid) {
      Alert.alert('Invalid VIN', validation.error);
      return;
    }

    setLoading(true);
    try {
      const result = await decodeVIN(validation.vin);
      
      if (result.success) {
        const vehicle = {
          ...result.data,
          timestamp: new Date().toISOString(),
        };
        
        addToHistory(vehicle);
        navigation.navigate('VehicleDetails', { vehicle });
      } else {
        Alert.alert('Lookup Failed', result.error || 'Unable to decode VIN');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to lookup VIN. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    setScanning(true);
    try {
      // In a real app, this would open camera
      // For now, use mock OCR
      const result = await mockOCRScan('mock-image-uri');
      
      if (result.success) {
        setVin(result.vin);
        setSnackbar({
          visible: true,
          message: `Scanned VIN: ${result.vin}`,
        });
      } else {
        Alert.alert('Scan Failed', 'Unable to scan VIN. Please try manually.');
      }
    } catch (error) {
      Alert.alert('Scan Error', 'Failed to scan. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const handleHistoryPress = (vehicle) => {
    navigation.navigate('VehicleDetails', { vehicle });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* Header Card */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.title}>VIN Scanner</Title>
            <Paragraph>
              Enter a 17-character Vehicle Identification Number or scan it using your camera.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Input Section */}
        <Card style={styles.inputCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Enter VIN</Title>
            <TextInput
              label="VIN Number"
              value={vin}
              onChangeText={setVin}
              mode="outlined"
              style={styles.input}
              maxLength={17}
              autoCapitalize="characters"
              placeholder="1HGCM82633A123456"
              right={
                <TextInput.Icon
                  icon="barcode-scan"
                  onPress={handleScan}
                  disabled={scanning}
                />
              }
            />
            
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleLookup}
                loading={loading}
                disabled={loading || vin.length !== 17}
                style={styles.lookupButton}
                icon="car-info"
              >
                Lookup Vehicle
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleScan}
                loading={scanning}
                disabled={scanning}
                style={styles.scanButton}
                icon="camera"
              >
                Scan VIN
              </Button>
            </View>
            
            <Paragraph style={styles.helperText}>
              VIN is usually found on the dashboard or driver's side door jamb.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Stats</Title>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>{history.length}</Paragraph>
                <Paragraph style={styles.statLabel}>Lookups</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>{favorites.length}</Paragraph>
                <Paragraph style={styles.statLabel}>Favorites</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>
                  {history.length > 0 ? Math.floor(history.length / 2) : 0}
                </Paragraph>
                <Paragraph style={styles.statLabel}>This Month</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recent History */}
        {history.length > 0 && (
          <Card style={styles.historyCard}>
            <Card.Content>
              <View style={styles.historyHeader}>
                <Title style={styles.sectionTitle}>Recent Lookups</Title>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('History')}
                  compact
                >
                  View All
                </Button>
              </View>
              
              {history.slice(0, 3).map((vehicle, index) => (
                <HistoryCard
                  key={index}
                  vehicle={vehicle}
                  onPress={() => handleHistoryPress(vehicle)}
                  isFavorite={favorites.includes(vehicle.vin)}
                />
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Tips</Title>
            <Paragraph style={styles.tipItem}>
              • VINs are 17 characters long (digits and capital letters)
            </Paragraph>
            <Paragraph style={styles.tipItem}>
              • Avoid confusing 0 (zero) with O, and 1 (one) with I
            </Paragraph>
            <Paragraph style={styles.tipItem}>
              • Scan in good lighting for best OCR results
            </Paragraph>
            <Paragraph style={styles.tipItem}>
              • Save frequent vehicles to Favorites for quick access
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB for quick actions */}
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="history"
        onPress={() => navigation.navigate('History')}
      />

      {/* Snackbar for scan results */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        action={{
          label: 'Lookup',
          onPress: () => {
            setSnackbar({ ...snackbar, visible: false });
            handleLookup();
          },
        }}
      >
        {snackbar.message}
      </Snackbar>

      {/* Loading overlay for scanning */}
      {scanning && (
        <View style={styles.scanningOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Paragraph style={styles.scanningText}>Scanning VIN...</Paragraph>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputCard: {
    margin: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  lookupButton: {
    flex: 1,
    marginRight: 8,
  },
  scanButton: {
    flex: 1,
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 8,
  },
  statsCard: {
    margin: 16,
    marginVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
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
  historyCard: {
    margin: 16,
    marginVertical: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsCard: {
    margin: 16,
    marginVertical: 8,
    marginBottom: 32,
  },
  tipItem: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
});

export default HomeScreen;