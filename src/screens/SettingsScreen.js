import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  List,
  Divider,
  useTheme,
  IconButton,
  RadioButton,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Store
import useStore from '../store/useStore';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const {
    darkMode,
    toggleDarkMode,
    settings,
    updateSettings,
    clearHistory,
    history,
    favorites,
  } = useStore();

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      `Are you sure you want to clear ${history.length} history items?`,
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

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This would export your vehicle history as a CSV file in a real app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {} },
      ]
    );
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@vinscanner.example.com');
  };

  const handleRateApp = () => {
    // In a real app, this would link to app store
    Alert.alert('Rate App', 'Thank you for using VIN Scanner!');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://example.com/terms');
  };

  const appVersion = '1.0.0';
  const buildNumber = '2026.02.18';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* App Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>App Settings</Title>
            
            <List.Section>
              <List.Item
                title="Dark Mode"
                description="Use dark theme"
                left={props => <List.Icon {...props} icon="theme-light-dark" />}
                right={props => (
                  <Switch
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                  />
                )}
              />
              <Divider />
              
              <List.Item
                title="Units"
                description="Measurement units"
                left={props => <List.Icon {...props} icon="ruler" />}
                right={props => (
                  <View style={styles.radioGroup}>
                    <RadioButton.Group
                      value={settings.units}
                      onValueChange={(value) => updateSettings({ units: value })}
                    >
                      <View style={styles.radioRow}>
                        <RadioButton value="imperial" />
                        <Text>Imperial</Text>
                        <RadioButton value="metric" style={styles.radioSpacing} />
                        <Text>Metric</Text>
                      </View>
                    </RadioButton.Group>
                  </View>
                )}
              />
              <Divider />
              
              <List.Item
                title="Auto-scan"
                description="Automatically scan when camera opens"
                left={props => <List.Icon {...props} icon="camera" />}
                right={props => (
                  <Switch
                    value={settings.autoScan}
                    onValueChange={(value) => updateSettings({ autoScan: value })}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                  />
                )}
              />
              <Divider />
              
              <List.Item
                title="Save History"
                description="Keep lookup history"
                left={props => <List.Icon {...props} icon="history" />}
                right={props => (
                  <Switch
                    value={settings.saveHistory}
                    onValueChange={(value) => updateSettings({ saveHistory: value })}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                  />
                )}
              />
              <Divider />
              
              <List.Item
                title="Notifications"
                description="Maintenance reminders"
                left={props => <List.Icon {...props} icon="bell" />}
                right={props => (
                  <Switch
                    value={settings.notifications}
                    onValueChange={(value) => updateSettings({ notifications: value })}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                  />
                )}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Data Management</Title>
            
            <View style={styles.dataStats}>
              <View style={styles.dataStat}>
                <Paragraph style={styles.dataNumber}>{history.length}</Paragraph>
                <Paragraph style={styles.dataLabel}>History Items</Paragraph>
              </View>
              <View style={styles.dataDivider} />
              <View style={styles.dataStat}>
                <Paragraph style={styles.dataNumber}>{favorites.length}</Paragraph>
                <Paragraph style={styles.dataLabel}>Favorites</Paragraph>
              </View>
              <View style={styles.dataDivider} />
              <View style={styles.dataStat}>
                <Paragraph style={styles.dataNumber}>
                  {new Set(history.map(v => v.make)).size}
                </Paragraph>
                <Paragraph style={styles.dataLabel}>Unique Makes</Paragraph>
              </View>
            </View>
            
            <View style={styles.dataButtons}>
              <Button
                mode="outlined"
                onPress={handleClearHistory}
                style={styles.dataButton}
                icon="delete"
                disabled={history.length === 0}
              >
                Clear History
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleExportData}
                style={styles.dataButton}
                icon="export"
                disabled={history.length === 0}
              >
                Export Data
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Support</Title>
            
            <List.Section>
              <List.Item
                title="Contact Support"
                description="Get help with the app"
                left={props => <List.Icon {...props} icon="help-circle" />}
                onPress={handleContactSupport}
                right={props => <List.Icon {...props} icon="chevron-right" />}
              />
              <Divider />
              
              <List.Item
                title="Rate the App"
                description="Share your feedback"
                left={props => <List.Icon {...props} icon="star" />}
                onPress={handleRateApp}
                right={props => <List.Icon {...props} icon="chevron-right" />}
              />
              <Divider />
              
              <List.Item
                title="Privacy Policy"
                left={props => <List.Icon {...props} icon="shield-lock" />}
                onPress={handlePrivacyPolicy}
                right={props => <List.Icon {...props} icon="chevron-right" />}
              />
              <Divider />
              
              <List.Item
                title="Terms of Service"
                left={props => <List.Icon {...props} icon="file-document" />}
                onPress={handleTermsOfService}
                right={props => <List.Icon {...props} icon="chevron-right" />}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* About */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About</Title>
            
            <View style={styles.aboutContent}>
              <Icon name="car" size={48} color={theme.colors.primary} />
              <Title style={styles.appName}>VIN Scanner</Title>
              <Paragraph style={styles.appDescription}>
                Scan and decode Vehicle Identification Numbers to get detailed vehicle information.
              </Paragraph>
              
              <View style={styles.versionInfo}>
                <Paragraph style={styles.versionText}>
                  Version {appVersion} (Build {buildNumber})
                </Paragraph>
                <Paragraph style={styles.copyright}>
                  © 2026 VIN Scanner App
                </Paragraph>
              </View>
              
              <Paragraph style={styles.disclaimer}>
                Vehicle information is provided for reference only. Always consult your owner's manual and certified mechanics for accurate information.
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Actions</Title>
            
            <View style={styles.quickActions}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Home')}
                style={styles.quickAction}
                icon="home"
              >
                Home
              </Button>
              
              <Button
                mode="contained"
                onPress={() => navigation.navigate('History')}
                style={styles.quickAction}
                icon="history"
              >
                History
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.quickAction}
                icon="arrow-left"
              >
                Back
              </Button>
            </View>
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
  card: {
    margin: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioSpacing: {
    marginLeft: 16,
  },
  dataStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  dataStat: {
    alignItems: 'center',
    flex: 1,
  },
  dataNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataLabel: {
    fontSize: 12,
    color: 'gray',
  },
  dataDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  dataButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  aboutContent: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  appDescription: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 16,
    lineHeight: 20,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: 'gray',
  },
  copyright: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  disclaimer: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default SettingsScreen;