import { View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Search = () => {
  return (
    <View className='px-5'>

    <View className='mt-5  bg-gray-50  rounded-full px-4 flex flex-row items-center justify-between'>
      <View className='flex flex-row items-center justify-center gap-x-4'>
        <Ionicons name='search' size={20} color='gray' />
      <TextInput placeholder="Search something" />
      </View>
      <Ionicons name='filter' size={20} color='gray' />
    </View>
    </View>
  )
}

export default Search