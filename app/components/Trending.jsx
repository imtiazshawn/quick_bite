import { View, FlatList, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import slider_01 from '../../assets/sliders/slider_01.jpg';
import slider_02 from '../../assets/sliders/slider_02.jpg';
import slider_03 from '../../assets/sliders/slider_03.jpg';
import slider_04 from '../../assets/sliders/slider_04.jpg';

const TrendingData = [
  {
    id: 1,
    image: slider_01
  },
  {
    id: 2,
    image: slider_02
  },
  {
    id: 3,
    image: slider_03
  },
  {
    id: 4,
    image: slider_04
  },
];

export default function Slider() {
  return (
    <View style={{ marginBottom: hp(2.5), paddingHorizontal: hp(2.5) }}>
      <FlatList 
        data={TrendingData}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View>
            <Image 
              source={item.image}
              className='mt-2 mr-3 rounded-md'
              style={{ height: hp(20), width: wp(80) }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
