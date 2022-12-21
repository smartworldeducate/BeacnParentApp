import {Platform} from 'react-native';

const fontFamily = {
  bold: Platform.OS === 'android' ? 'OpenSans-Bold' : 'OpenSans-Bold',
  semiBold:
    Platform.OS === 'android' ? 'OpenSans-Semibold' : 'OpenSans-Semibold',
  extraBold:
    Platform.OS === 'android' ? 'OpenSans-Extrabold' : 'OpenSans-Extrabold',
  regular: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans',
  boldItalic:
    Platform.OS === 'android' ? 'OpenSans-BoldItalic' : 'OpenSans-BoldItalic',

  regularAlatsi:
    Platform.OS === 'android' ? 'Alatsi-Regular' : 'Alatsi-Regular',

  helveticaLight: Platform.OS === 'android' ? 'Helvetica' : 'Helvetica',
  // helveticaLight: Platform.OS === "android" ? "helvetica-light" : "helvetica-light",
  helveticaBold:
    Platform.OS === 'android' ? 'Helvetica-Bold' : 'Helvetica-Bold',

  helveticaRegular:
    Platform.OS === 'android' ? 'NewHelvetica-Regular' : 'NewHelvetica-Regular',
};

export default fontFamily;
