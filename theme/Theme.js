import {createTheme} from '@rneui/themed';
import COLORS from './Colors';

const theme = createTheme({
  components: {
    Button: {
      radius: 'lg',
      buttonStyle: {
        backgroundColor: COLORS.primary,
      },
      containerStyle: {
        alignSelf: 'center',
      },
      titleStyle: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
      },
    },
    Icon: {
      color: COLORS.primary,
    },
    Slider: {
      maximumTrackTintColor: COLORS.lightGray1,
      minimumTrackTintColor: COLORS.fadedBlack,
      orientation: 'horizontal',
      minimumValue: 0,
    },
    Switch: {
      trackColor: {true: COLORS.primary},
    },
    Tab: {
      indicatorStyle: {
        backgroundColor: COLORS.primary,
      },
    },
  },
});

export default theme;
