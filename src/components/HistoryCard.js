import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStore from '../store/useStore';

const HistoryCard = ({ vehicle, onPress, isFavorite }) => {
  const theme = useTheme();
  const { toggleFavorite } = useStore();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFavoritePress = () => {
    toggleFavorite(vehicle.vin);
  };

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.vehicleInfo}>
            <Title style={styles.vehicleTitle}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Title>
            <Paragraph style={styles.vinText}>{vehicle.vin}</Paragraph>
          </View>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? theme.colors.error : theme.colors.secondaryText}
            size={24}
            onPress={handleFavoritePress}
          />
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="engine" size={16} color={theme.colors.secondaryText} />
            <Paragraph style={styles.detailText}>
              {vehicle.engine?.cylinders || 'N/A'} cyl • {vehicle.engine?.displacement || 'N/A'}L
            </Paragraph>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="cog" size={16} color={theme.colors.secondaryText} />
            <Paragraph style={styles.detailText}>
              {vehicle.transmission?.type || 'N/A'} • {vehicle.drivetrain || 'N/A'}
            </Paragraph>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="oil" size={16} color={theme.colors.secondaryText} />
            <Paragraph style={styles.detailText}>
              Oil: {vehicle.maintenance?.oil?.type || 'N/A'}
            </Paragraph>
          </View>
        </View>

        <View style={styles.footer}>
          <Paragraph style={styles.timestamp}>
            {formatDate(vehicle.timestamp)}
          </Paragraph>
          <View style={styles.footerIcons}>
            {vehicle.maintenance?.oil && (
              <Icon name="oil-check" size={16} color={theme.colors.success} />
            )}
            {vehicle.maintenance?.tires && (
              <Icon name="tire" size={16} color={theme.colors.info} style={styles.iconSpacing} />
            )}
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleInfo: {
    flex: 1,
    marginRight: 8,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  vinText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'monospace',
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 8,
  },
});

export default HistoryCard;