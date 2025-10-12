import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Card from './Card'

const Featured = () => {
  return (
    <View className='my-5 '>
      <View className=' px-5 flex flex-row justify-between items-center'>
        <Text>Featured</Text>
        <Text>See All</Text>
      </View>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Card />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='flex gap-5 mt-5 px-5'
      />
    </View>
  )
}

export default Featured