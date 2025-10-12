import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Recommendation = () => {
  return (
    <View className='my-5 '>
      <View className=' px-5 flex flex-row justify-between items-center'>
        <Text>Our Recommendation</Text>
        <Text>See All</Text>
      </View>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View className='bg-purple-400 px-4 py-1 rounded-full'>
            <Text>All</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='flex gap-5 mt-5 px-5'
      />
    </View>
  )
}

export default Recommendation