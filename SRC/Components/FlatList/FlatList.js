import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

const FlatListItem = ({
  data,
  renderItem,
  horizontal,
  numColumns,
  keyExtractor,
  ListEmptyComponent,
  initialNumToRender,
  ItemSeparatorComponent,
  windowSize,
  maxToRenderPerBatch
}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={horizontal}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={initialNumToRender}
      ItemSeparatorComponent={ItemSeparatorComponent}
      windowSize={windowSize}
      maxToRenderPerBatch={maxToRenderPerBatch}
    />
  );
};

const style = StyleSheet.create({});
export default FlatListItem;
