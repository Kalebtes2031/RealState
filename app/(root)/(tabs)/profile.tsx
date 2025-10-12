import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>

      {[1,2,3,4,5,6,7,8,9,10].map((item) => (
        <View key={item} className='flex-col w-40 h-60 px-4 bg-gray-400'>
          <Text>profile</Text>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile